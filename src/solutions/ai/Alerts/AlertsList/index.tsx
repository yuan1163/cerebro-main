import React, { useState } from 'react';
import { cn } from '@core/utils/classnames';

// components
import { Scrollbar } from '@core/ui/components/Scrollbar';

// icons
import UpDownArrowIcon from '@assets/icons/IvedaAI/up_down.svg?component';

type AlertSeverity = 'critical' | 'warning' | 'info';

type AlertItem = {
  id: number;
  title: string;
  cameraName: string;
  severity: AlertSeverity;
  count: number;
  timeAgo: string;
  location: string;
  created: string;
  imageUrl?: string;
  status: 'active' | 'resolved';
  alertCount: number;
};

type AlertsListProps = {
  className?: string;
  alerts?: AlertItem[];
};

// Fake data for alerts
const fakeAlerts: AlertItem[] = [
  {
    id: 1,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'critical',
    count: 3,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 2,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'critical',
    count: 2,
    timeAgo: '7h ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 12:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 3,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'info',
    count: 1,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 4,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'warning',
    count: 1,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 5,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'critical',
    count: 2,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 6,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'warning',
    count: 2,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 7,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'critical',
    count: 2,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    status: 'active',
    alertCount: 2,
  },
  {
    id: 8,
    title: 'Public Fight',
    cameraName: 'CCTV-13',
    severity: 'critical',
    count: 2,
    timeAgo: '39min ago',
    location: '24th Bullock St, Barangay 2',
    created: '2025-02-28 19:19:55',
    status: 'active',
    alertCount: 2,
  },
];

const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return {
        border: 'bg-[#ff4545]',
        badge: 'bg-[#ff4545]',
      };
    case 'warning':
      return {
        border: 'bg-[#f4ab00]',
        badge: 'bg-[#f4ab00]',
      };
    case 'info':
      return {
        border: 'bg-[#00aaf3]',
        badge: 'bg-[#00aaf3]',
      };
  }
};

type AlertItemProps = {
  alert: AlertItem;
  selected: boolean;
  onClick: () => void;
};

type SortMode = 'time' | 'critical' | 'warning' | 'info';

const AlertItem = ({ alert, selected, onClick }: AlertItemProps) => {
  const colors = getSeverityColor(alert.severity);

  const backgroundClass = selected ? 'bg-primary-50' : 'bg-white hover:bg-hover ';

  return (
    <div className={cn('px-5 cursor-pointer', backgroundClass)} onClick={onClick}>
      <div className='py-5 flex gap-4 border-b border-[rgba(0,0,0,0.08)]'>
        <div className={cn('self-stretch rounded-[2px] w-1', colors.border)} />
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center flex-1 gap-3'>
            <p className='font-medium text-[16px] text-neutral-900'>{alert.title}</p>
            <p className='font-medium text-[16px] text-secondary-500'>{alert.cameraName}</p>
          </div>
          <div className='flex flex-col items-end h-full gap-3'>
            <div
              className={cn(
                'flex flex-col items-center justify-center px-2.5 py-0.5 rounded min-w-[30px]',
                colors.badge,
              )}
            >
              <p className='font-bold text-[14px] text-white text-center'>{alert.count}</p>
            </div>
            <p className='font-medium text-[16px] text-secondary-500 text-right whitespace-nowrap'>{alert.timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AlertsList({ className, alerts = fakeAlerts }: AlertsListProps) {
  const [sortMode, setSortMode] = useState<SortMode>('time');
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);

  const handleAlertClick = (alertId: number) => {
    setSelectedAlertId(alertId);
  };

  const toggleSort = () => {
    setSortMode((prevMode) => {
      switch (prevMode) {
        case 'time':
          if (alerts.some((alert) => alert.severity === 'critical')) {
            return 'critical';
          } else if (alerts.some((alert) => alert.severity === 'warning')) {
            return 'warning';
          } else if (alerts.some((alert) => alert.severity === 'info')) {
            return 'info';
          }
        case 'critical':
          if (alerts.some((alert) => alert.severity === 'warning')) {
            return 'warning';
          } else if (alerts.some((alert) => alert.severity === 'info')) {
            return 'info';
          }
        case 'warning':
          if (alerts.some((alert) => alert.severity === 'info')) {
            return 'info';
          }
        case 'info':
          return 'time';
      }
    });
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    switch (sortMode) {
      case 'time':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case 'critical': {
        // Order: critical -> warning -> info
        const severityOrder: Record<AlertSeverity, number> = { critical: 0, warning: 1, info: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      case 'warning': {
        // Order: warning -> info -> critical
        const severityOrder: Record<AlertSeverity, number> = { warning: 0, info: 1, critical: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      case 'info': {
        // Order: info -> critical -> warning
        const severityOrder: Record<AlertSeverity, number> = { info: 0, critical: 1, warning: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
    }
  });

  return (
    <div
      className={cn(
        'bg-white flex flex-col rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] overflow-hidden',
        className,
      )}
    >
      {/* Header */}
      <div className='bg-white flex justify-between items-center gap-2 px-5 py-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12)]'>
        <h2 className='font-medium text-[18px] text-black flex-1'>Incident Monitoring</h2>
        <button onClick={toggleSort} className='flex items-center justify-center w-6 h-6 overflow-hidden bg-white'>
          <UpDownArrowIcon />
        </button>
      </div>

      {/* Content - Scrollable */}
      <Scrollbar>
        <div>
          {sortedAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              selected={alert.id === selectedAlertId}
              onClick={() => handleAlertClick(alert.id)}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}
