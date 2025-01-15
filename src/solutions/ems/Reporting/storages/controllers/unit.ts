import { queryClient } from '@app/DataAccessAdapter';
import { ui, useUI } from '@core/storages/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiGetProcess } from '../../api/entities/process';
import {
  apiCreateUnit,
  apiCreateUnitProcess,
  apiDeleteUnit,
  apiDeleteUnitProcess,
  apiGetUnit,
  apiUpdateUnit,
} from '../../api/entities/unit';
import { Process } from '../../data/process';
import { Unit, UnitInput, UnitProcess } from '../../data/unit';
import { useProcess } from './process';

const CONTROLLER = 'unit';

class UnitController {
  unit?: Unit[];
  removeHandler?: (unit: Partial<Unit>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.unit;
  }

  getData(): Unit[] {
    return this.unit!;
  }

  remove(unit: Partial<Unit>) {
    this.removeHandler?.(unit);
  }

  constructor(unit?: Unit[], removeHandler?: (unit: Partial<Unit>) => void) {
    this.unit = unit;
    this.removeHandler = removeHandler;
  }
}

export const useUnit = (unit: Partial<Unit>) => {
  const mtAddUnit = useMutation(apiCreateUnit);
  const mtAddUnitProcess = useMutation(apiCreateUnitProcess);
  const mtUpdateUnit = useMutation(apiUpdateUnit);
  const mtRemove = useMutation(apiDeleteUnit);
  const mtRemoveUnitProcess = useMutation(apiDeleteUnitProcess);

  const get = (filter: Partial<UnitInput>) => {
    const { data } = useQuery([CONTROLLER, filter], () => apiGetUnit(filter), {
      staleTime: Infinity,
      cacheTime: Infinity,
    });

    return data;
  };

  const getProcess = (filter: Partial<UnitProcess>) => {
    const { data } = useQuery(['processOption', filter], () => apiGetProcess(filter), {
      staleTime: Infinity,
      cacheTime: 0,
    });

    return data;
  };

  const add = async (unitData: Partial<Unit>, processIdData: number[]) => {
    // Create unit
    const { unitId } = await mtAddUnit.mutateAsync(unitData);
    unit.unitId = unitId;

    // Create Unit Process
    processIdData.map(async (processId) => {
      const queryUnitProcess = {
        unitId: unitId,
        locationId: unit.locationId,
        processId: processId,
      };

      await mtAddUnitProcess.mutateAsync(queryUnitProcess);
    });

    await UnitController.invalidate();
  };

  const update = async (unitData: Partial<Unit>, processIdData: { old: number[]; new: number[] }) => {
    // Update unit
    await mtUpdateUnit.mutateAsync(unitData);

    const intersection = processIdData.new.filter((n) => {
      return processIdData.old && processIdData.old.indexOf(n) > -1;
    });

    // Create Unit Process
    processIdData.new.map(async (processId) => {
      if (!intersection.includes(processId)) {
        const queryUnitProcess = {
          unitId: unitData.unitId,
          locationId: unit.locationId,
          processId: processId,
        };

        await mtAddUnitProcess.mutateAsync(queryUnitProcess);
      }
    });

    // Delete Unit Process
    processIdData.old &&
      processIdData.old.map(async (processId) => {
        if (!intersection.includes(processId)) {
          const queryUnitProcess = {
            unitId: unitData.unitId,
            locationId: unit.locationId,
            processId: processId,
          };

          await mtRemoveUnitProcess.mutateAsync(queryUnitProcess);
        }
      });

    // Update Unit Process

    await UnitController.invalidate();
    await queryClient.invalidateQueries(['processOption']);
  };

  const remove = async (item: Partial<Unit>, process: Process[] | [] | undefined) => {
    // Remove Unit Process
    process?.map(async (p) => {
      const queryUnitProcess = {
        unitId: item.unitId,
        locationId: item.locationId,
        processId: p.processId,
      };

      await mtRemoveUnitProcess.mutateAsync(queryUnitProcess);
    });

    await mtRemove.mutateAsync(item);
    await UnitController.invalidate();
    queryClient.invalidateQueries(['processHistory', { 'locationId': unit.locationId }]);
  };

  return {
    get,
    getProcess,
    add,
    update,
    remove,
  };
};
