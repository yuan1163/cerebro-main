import { useMutation, useQuery } from '@tanstack/react-query';
import { DeviceCommandData, DeviceCommandInput, DeviceInput } from '@core/api/types';
import { apiGetDeviceParameters, apiPostDeviceCommand } from '@core/api/entities/deviceItems';
import { queryClient } from '@app/DataAccessAdapter';

export const useDeviceIndexParameter = (filter: DeviceInput, name?: string | null, index?: string | null) => {
  const { data } = useQuery(['DeviceParameters', filter], () => apiGetDeviceParameters(filter), {
    enabled: !!filter.locationId && !!filter.deviceId,
  });
  if (data) {
    const i = data.findIndex((item) => item.name === name && item.index === index);
    if (i > -1) return data[i];
  }
};

export const usePostDeviceIndexParameter = (
  filter: DeviceCommandInput,
  deviceId?: string | null,
  commandType?: number,
  name?: string,
  index?: string | null,
) => {
  const mutation = useMutation((data: DeviceCommandData) => apiPostDeviceCommand(filter, data));
  return async (value: string) => {
    const data: DeviceCommandData = {
      command: {
        deviceId,
        commandType,
        parameters: [
          {
            name,
            index,
            value,
          },
        ],
      },
    };
    await mutation.mutateAsync(data);
    // await queryClient.invalidateQueries(['DeviceParameters']);
  };
};
