import ExcelJS from 'exceljs';
import { useState } from 'react';
import { Button } from '@core/ui/components/Button';
import DownloadIcon from '@assets/icons/LevelNOW/download.svg?component';

import { TankData } from '@core/api/types';
import { useTanks } from '@core/storages/controllers/levelnow/tank';
import { apiGetTank } from '@core/api/entities/levelnow/tank';

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const tanks = useTanks();

  const fetchTankDetails = async (tankId: number): Promise<TankData | null> => {
    try {
      const response = await apiGetTank(tankId);
      if (!response.success) {
        console.error(`Failed to fetch tank ${tankId}`);
        return null;
      }
      const result = response.data;
      return result || null;
    } catch (error) {
      console.error(`Error fetching tank ${tankId}:`, error);
      return null;
    }
  };
  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();

      // Add a new worksheet
      const worksheet = workbook.addWorksheet('Tank Data');

      // Add title row with "Tank Report" (left) and date (right)
      const titleRow = worksheet.addRow([]);
      titleRow.getCell(1).value = 'Tank Report';
      titleRow.getCell(1).font = { bold: true, size: 18 };
      titleRow.getCell(1).alignment = { horizontal: 'left' };

      // Add current date to the last column (column 12)
      const currentDate = new Date().toLocaleDateString();
      titleRow.getCell(12).value = currentDate;
      titleRow.getCell(12).font = { bold: true, size: 14 };
      titleRow.getCell(12).alignment = { horizontal: 'right' };

      // Add empty row for spacing
      worksheet.addRow([]);

      // Manually add header row
      const headerRow = worksheet.addRow([
        'No',
        'Tank No.',
        'Description',
        'Oil Type',
        'Oil Viscosity',
        'Last Oil Filling Date',
        'Device Reference',
        'Oil Level',
        'Battery',
        'Gateway Status',
        'Network',
        'Gateway Version',
      ]);

      // Style the header row (table column titles)
      headerRow.font = { bold: true, size: 12 };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }, // Light gray background
      };
      headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

      // Set column widths
      worksheet.getColumn(1).width = 10; // No
      worksheet.getColumn(2).width = 15; // Tank No.
      worksheet.getColumn(3).width = 25; // Description
      worksheet.getColumn(4).width = 15; // Oil Type
      worksheet.getColumn(5).width = 15; // Oil Viscosity
      worksheet.getColumn(6).width = 20; // Last Oil Filling Date
      worksheet.getColumn(7).width = 20; // Device Reference
      worksheet.getColumn(8).width = 12; // Oil Level
      worksheet.getColumn(9).width = 12; // Battery
      worksheet.getColumn(10).width = 15; // Gateway Status
      worksheet.getColumn(11).width = 12; // Network
      worksheet.getColumn(12).width = 15; // Gateway Version

      // Fetch detailed data for all tanks
      const tankDetailsPromises = tanks.map((tank) => fetchTankDetails(tank.tankId));
      const tankDetails = await Promise.all(tankDetailsPromises);

      // Add tank data rows with detailed information
      tanks.forEach((tank, index) => {
        const details = tankDetails[index];

        worksheet.addRow([
          index + 1, // No
          tank.tankNo, // Tank No.
          details?.deviceDescription || 'N/A', // Description
          details?.deviceOilType || 'N/A', // Oil Type
          details?.deviceOilViscosity || 'N/A', // Oil Viscosity
          details?.deviceFillingDate ? new Date(details.deviceFillingDate).toLocaleDateString() : 'N/A', // Last Oil Filling Date
          tank.deviceReference, // Device Reference
          `(${tank.deviceLevelLabel})`, // Oil Level
          `${tank.deviceBattery}%`, // Battery
          tank.deviceConnection === 1 ? 'Online' : 'Offline', // Gateway Status
          tank.deviceConnection === 1 ? 'Connected' : 'Disconnected', // Network
          details?.gatewayVersion || 'N/A', // Gateway Version
        ]);
      });

      // If no tanks data, add a message row
      if (tanks.length === 0) {
        worksheet.addRow([
          '', // No
          'No tank data available', // Tank No.
          '', // Description
          '', // Oil Type
          '', // Oil Viscosity
          '', // Last Oil Filling Date
          '', // Device Reference
          '', // Oil Level
          '', // Battery
          '', // Gateway Status
          '', // Network
          '', // Gateway Version
        ]);
      }
      // Write to a buffer
      const buffer = await workbook.xlsx.writeBuffer();
      // Create a Blob from the buffer
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      // Create a link element
      const link = document.createElement('a');
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      // Set the link's href to the Blob URL
      link.href = url;
      // Set the download attribute with a filename
      link.download = 'tank-report.xlsx';
      // Append the link to the body
      document.body.appendChild(link);
      // Programmatically click the link to trigger the download
      link.click();
      // Clean up by removing the link and revoking the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading tank report:', error);
      alert('下載失敗，請稍後再試');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant='solid'
      iconColor='white'
      fontSize='md'
      fontWeight='medium'
      className='w-40 px-3 tracking-32 text-common-white'
      align='start'
      onClick={handleDownload}
      loading={isDownloading}
    >
      <DownloadIcon className='mr-2' />
      {isDownloading ? '' : 'Tanks Report'}
    </Button>
  );
}
