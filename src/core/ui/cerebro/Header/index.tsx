import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// storages
import { useAuth } from '@core/storages/auth';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// API
import { api } from '@core/api';

// types
import { Solutions } from '@core/ui/types';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { AppBar } from '@core/ui/components/AppBar';
import { Avatar } from '@core/ui/components/Avatar';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Chip } from '@core/ui/components/Chip';
import { Decorator } from '@core/ui/components/Decorator';
import { Grid } from '@core/ui/components/Grid';
import { Heading } from '@core/ui/components/Heading';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Menu } from '@core/ui/components/Menu';
import { MenuList } from '@core/ui/components/MenuList';
import { Paper } from '@core/ui/components/Paper';
import { SolutionsSelector } from '@core/ui/components/SolutionsSelector';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { TimeInfo } from '@core/ui/components/TimeInfo';
import { Toolbar } from '@core/ui/components/Toolbar'; // 添加 Toolbar 的導入
import { WeatherInfo } from '@core/ui/components/WeatherInfo';
import { LocationInfo } from './LocationInfo';
import { UserInfo } from './UserInfo';

// icons
import ArrowLeftLineIcon from '@assets/icons/line/arrow-left.svg?component';
import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';
import Bell02LineIcon from '@assets/icons/line/bell-02.svg?component';
import DotsGridRectanglesLineIcon from '@assets/icons/line/dots-grid-rectangles.svg?component';

// API 響應類型定義
interface ApiResponse {
  resultCode: number;
  tokenExpire: string;
  tokenExpireMs: number;
  tokenType: number;
  data: Record<string, any>;
  issues: Issue[];
}

interface Issue {
  issueId: number;
  locationId: number;
  alerts: Alert[];
  priority: number;
  status: number;
  creationDate: string;
  creationDateMs: number;
  updateDateMs: number;
  dueDateMs: number;
  title: string;
  text: string;
  assignee: {
    userId: number;
    firstName: string;
    lastName: string;
  };
  reporter: {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  isRead: boolean;
}

interface Alert {
  alertId: number;
  creationDate: string;
  creationDateMs: number;
}

// 評論API數據結構
interface CommentApiResponse {
  resultCode: number;
  tokenExpire: string;
  tokenExpireMs: number;
  tokenType: number;
  data: Record<string, any>;
  comments: Comment[];
}

interface Comment {
  commentId: number;
  issueId: number;
  author: {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  text: string;
  creationDate: string;
  creationDateMs: number;
}

// 用於UI顯示的通知類型
interface Notification {
  id: string;
  author: string;
  action: string;
  time: string;
  title: string;
  issueNumber?: string;
  status?: string;
  comment?: string;
  isRead: boolean;
  locationId: number;
  isExpanded: boolean;
  originalText: string;
  comments: Comment[];
  creationDateMs: number;
}

type Props = {
  backLink?: boolean;
  className?: string;
  icon?: React.ReactNode;
  solutionSelector?: boolean;
  solutionsDomainLink?: boolean;
  title?: string;
  widgets?: boolean;
};

export const Header: React.FC<Props> = ({
  backLink,
  className,
  icon,
  solutionsDomainLink,
  solutionSelector = true,
  title,
  widgets = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const ui = useUI();
  const locations = useLocations();
  const authStore = useAuth();

  // 狀態管理
  const [openIssues, setOpenIssues] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState<Record<string, boolean>>({});
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [activeSolution, setActiveSolution] = useState('levelnow');

  const timerRef = useRef<number | null>(null);

  // 檢查未讀通知的函數
  const checkUnreadNotifications = useCallback(async () => {
    try {
      const locationId = locations.getElementById(ui.currentFormation)?.locationId || '';
      if (!locationId) return;

      const endpoint = `issue?locationId=${locationId}`;

      // 使用API層獲取通知數據
      const response = await api.get<void, ApiResponse>(endpoint);

      if (response && response.resultCode === 0 && Array.isArray(response.issues)) {
        // 檢查是否有未讀通知
        const hasUnread = response.issues.some((issue) => !issue.isRead);
        setHasUnreadNotifications(hasUnread);
      }
    } catch (error) {
      console.error('Error checking unread notifications:', error);
    }
  }, [locations, ui.currentFormation]);

  // 設置定時器，每兩分鐘檢查一次未讀通知
  useEffect(() => {
    // 立即執行一次檢查
    checkUnreadNotifications();

    timerRef.current = window.setInterval(() => {
      checkUnreadNotifications();
    }, 2 * 60 * 1000);

    // 組件卸載時清除定時器
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [checkUnreadNotifications]);

  // 獲取解決方案信息
  useEffect(() => {
    if (location.pathname !== '/solutions' || authStore.hasNavigatedPostLogin) {
      authStore.setNavigationPerformedPostLogin(true);
    }

    const storedActiveSolution = localStorage.getItem('activeSolution') as Solutions;
    if (storedActiveSolution) {
      setActiveSolution(storedActiveSolution);
    }
  }, [location.pathname, authStore]);

  // 獲取通知列表
  useEffect(() => {
    if (openIssues) {
      fetchNotifications();
      setHasUnreadNotifications(false);
    }
  }, [openIssues]);

  // 將API數據轉換為UI所需格式的函數
  const transformIssueToNotification = (issue: Issue): Notification => {
    // 計算時間差
    const now = new Date().getTime();
    const creationTime = issue.creationDateMs;
    const diffMinutes = Math.floor((now - creationTime) / (60 * 1000));

    let timeString = `${diffMinutes} min ago`;
    if (diffMinutes > 60) {
      const diffHours = Math.floor(diffMinutes / 60);
      timeString = `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;

      if (diffHours > 24) {
        const diffDays = Math.floor(diffHours / 24);
        timeString = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      }
    }

    return {
      id: issue.issueId.toString(),
      author: `${issue.reporter.firstName} ${issue.reporter.lastName}`,
      action: 'reported an issue',
      time: timeString,
      title: issue.title,
      issueNumber: `CLR-${issue.issueId}`,
      status: issue.status === 1 ? 'In Progress' : 'Open',
      isRead: issue.isRead,
      locationId: issue.locationId,
      isExpanded: true,
      originalText: '', // 不顯示原始文本
      comments: [],
      creationDateMs: issue.creationDateMs,
    };
  };

  // 獲取特定通知的評論
  const fetchComments = async (notification: Notification) => {
    if (isLoadingComments[notification.id]) return;

    setIsLoadingComments((prev) => ({
      ...prev,
      [notification.id]: true,
    }));

    try {
      const endpoint = `issueComment?locationId=${notification.locationId}&issueId=${notification.id}`;

      const response = await api.get<void, CommentApiResponse>(endpoint);

      if (response && response.resultCode === 0 && Array.isArray(response.comments)) {
        console.log(`Received ${response.comments.length} comments for notification ${notification.id}`);
        setNotifications((prevNotifications) =>
          prevNotifications.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  comments: response.comments,
                  isExpanded: true,
                }
              : item,
          ),
        );
      } else {
        console.error('Invalid comments API response:', response);
      }
    } catch (error) {
      console.error(`Error fetching comments for issue ${notification.id}:`, error);
    } finally {
      setIsLoadingComments((prev) => ({
        ...prev,
        [notification.id]: false,
      }));
    }
  };

  // 批量獲取評論
  const fetchAllComments = (notifications: Notification[]) => {
    // 確保notifications是數組且不為空
    if (!Array.isArray(notifications) || notifications.length === 0) {
      console.log('No notifications to fetch comments for');
      return;
    }

    // 逐個獲取評論
    notifications.forEach((notification) => {
      // 使用setTimeout確保在React狀態更新後調用
      setTimeout(() => {
        fetchComments(notification).catch((error) => {
          console.error(`Failed to fetch comments for notification ${notification.id}:`, error);
        });
      }, 100);
    });
  };

  // 獲取通知列表
  const fetchNotifications = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const locationId = locations.getElementById(ui.currentFormation)?.locationId || '';
      if (!locationId) {
        console.log('No location ID found, skipping notifications fetch');
        return;
      }

      const endpoint = `issue?locationId=${locationId}`;

      const response = await api.get<void, ApiResponse>(endpoint);

      if (response && response.resultCode === 0 && Array.isArray(response.issues)) {
        let transformedNotifications = response.issues.map(transformIssueToNotification);

        transformedNotifications.sort((a: Notification, b: Notification) => {
          if (!a.isRead && b.isRead) return -1;
          if (a.isRead && !b.isRead) return 1;
          return b.creationDateMs - a.creationDateMs;
        });

        const limitedNotifications = transformedNotifications.slice(0, 3);
        setNotifications(limitedNotifications);
        setTotalNotifications(transformedNotifications.length);

        fetchAllComments(limitedNotifications);
      } else {
        console.error('Unexpected API response format:', response);
        setNotifications([]);
        setTotalNotifications(0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([
        {
          id: '1',
          author: 'Jenny Wilson',
          action: 'commented on issue',
          time: '5 min ago',
          title: 'Bring X-ray machine back from Admission room',
          issueNumber: 'CLR-1234',
          status: 'In Progress',
          comment:
            '@John Maxwell Create a ticketing system for the Cerebro which can be used w/ different DX solutions, and became the universal method to assign and track issues within',
          isRead: false,
          locationId: 1,
          isExpanded: true,
          originalText: '',
          comments: [],
          creationDateMs: Date.now(),
        },
      ]);
      setTotalNotifications(1);
    } finally {
      setIsLoading(false);
    }
  };

  // 標記所有通知為已讀
  const markAllAsRead = async () => {
    if (isMarkingAsRead || notifications.length === 0) return;

    setIsMarkingAsRead(true);
    try {
      const locationId = locations.getElementById(ui.currentFormation)?.locationId || '';
      const unreadNotifications = notifications.filter((notification) => !notification.isRead);

      if (unreadNotifications.length === 0) {
        console.log('No unread notifications');
        return;
      }

      for (const notification of unreadNotifications) {
        try {
          const endpoint = `issue/read?locationId=${locationId}&issueId=${notification.id}`;
          await api.post(endpoint);
        } catch (error) {
          console.error(`Failed to mark notification ${notification.id} as read:`, error);
        }
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    } finally {
      setIsMarkingAsRead(false);
    }
  };

  // 標記單個通知為已讀
  const markIssueAsRead = async (notification: Notification) => {
    try {
      const endpoint = `issue/read?locationId=${notification.locationId}&issueId=${notification.id}`;
      await api.post(endpoint);

      setNotifications((prevNotifications) =>
        prevNotifications.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)),
      );
    } catch (error) {
      console.error(`Failed to mark notification ${notification.id} as read:`, error);
    }
  };

  // 打開通知面板時，重置未讀狀態並加載通知
  // const handleOpenNotifications = () => {
  //   setOpenIssues(prev => {
  //     const newState = !prev;

  //     if (newState) {
  //       setHasUnreadNotifications(false);
  //       fetchNotifications();
  //     }

  //     return newState;
  //   });
  // };

  const handleOpenIssues = () => {
    if (openIssues) {
      setOpenIssues(false);
    }
  };

  // 處理通知點擊事件
  const handleNotificationClick = (notification: Notification) => {
    // 檢查當前是否已經在該問題頁面
    const targetPath = `/ems/issues/${notification.locationId}/issue/${notification.id}`;
    if (location.pathname === targetPath) {
      console.log('Already on the target issue page');
      setOpenIssues(false);
      return;
    }

    // 如果不是，則標記為已讀並導航
    markIssueAsRead(notification);
    navigate(targetPath);
    setOpenIssues(false);
  };

  // 跳轉到查看所有通知頁面
  const handleViewAllClick = () => {
    const locationId = locations.getElementById(ui.currentFormation)?.locationId || '315';
    navigate(`/ems/issues/${locationId}/all`);
    setOpenIssues(false);
  };

  // 處理導航
  const handleBackNavigateClick = () => {
    navigate(`/${activeSolution}`);
  };

  const handleBackLinkNavigateClick = () => {
    navigate(-1);
  };

  return (
    <AppBar className={cn(className)}>
      <Toolbar disableGutters>
        <div className={styles['title-content-container']}>
          <div className={styles['title-content']}>
            {!backLink && !solutionsDomainLink && (
              <Icon color='secondary' size='xl' variant='tint'>
                {icon}
              </Icon>
            )}
            {authStore.hasNavigatedPostLogin && backLink && (
              <Icon color='secondary' component='button' onClick={handleBackLinkNavigateClick} size='xl' variant='tint'>
                <ArrowLeftLineIcon />
              </Icon>
            )}
            {authStore.hasNavigatedPostLogin && solutionsDomainLink && (
              <Icon color='secondary' component='button' onClick={handleBackNavigateClick} size='xl' variant='tint'>
                <DotsGridRectanglesLineIcon />
              </Icon>
            )}
            <Text component='h1' variant='2xl' weight='semibold'>
              {title}
            </Text>
          </div>
        </div>

        <Stack className={styles['widgets-container']} direction='row' spacing={3}>
          {activeSolution !== 'levelnow' && widgets && (
            <Grid alignItems='center' container spacing={5}>
              {locations.getElementById(ui.currentFormation)?.timezone && (
                <Grid item>
                  <TimeInfo timezone={locations.getElementById(ui.currentFormation)?.timezone} />
                </Grid>
              )}
              <Grid item>
                <LocationInfo handleOpenIssues={handleOpenIssues} />
              </Grid>
            </Grid>
          )}

          {solutionSelector && <SolutionsSelector />}

          {/* 通知 */}
          {activeSolution !== 'levelnow' && (
            <Menu
              disableGutters
              button={
                <IconButton
                  ariaLabel={t('user.notifications.label', 'Notifications', 'Notifications.')}
                  component='div'
                  color='icon-secondary'
                  decoratorSize='lg'
                  onClick={() => setOpenIssues((prev) => !prev)}
                  size='md'
                  variant='ghost'
                >
                  {/* 使用單獨的包裝元素應用填充效果 */}
                  <span className={hasUnreadNotifications ? styles['bell-filled'] : ''}>
                    <Bell02LineIcon />
                  </span>
                </IconButton>
              }
              placement='bottom-end'
            >
              <MenuList>
                <Card width={29}>
                  <CardHeader borderBottom>
                    <Grid container alignItems='baseline' justifyContent='between' fullWidth spacing={2}>
                      <Grid item>
                        <Text component='span' variant='base' weight='semibold'>
                          {t('user.notifications.label', 'Notifications', 'Notifications.')}
                        </Text>
                      </Grid>
                      <Grid item>
                        <Button
                          variant='link'
                          onClick={markAllAsRead}
                          disabled={
                            isMarkingAsRead || notifications.length === 0 || notifications.every((n) => n.isRead)
                          }
                        >
                          {isMarkingAsRead
                            ? t('general.processing.label', 'Processing...', 'Indicates an action is in progress.')
                            : t(
                                'general.markAllIsRead.label',
                                'Mark all is read',
                                "Indicates the user's intention to mark all items as read.",
                              )}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardHeader>

                  <CardContent>
                    {isLoading ? (
                      <Text variant='sm'>
                        {t('general.loadingNotifications.label', 'loadingNotifications', 'loadingNotifications')}
                      </Text>
                    ) : notifications.length === 0 ? (
                      <Text variant='sm'>
                        {t('general.noNotifications.label', 'noNotifications', 'noNotifications')}
                      </Text>
                    ) : (
                      <div className={styles['notifications-container']}>
                        {notifications.map((notification) => (
                          <Grid
                            container
                            spacing={4}
                            key={notification.id}
                            className={`${styles['notification-item']} ${styles['notification-clickable']}`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <Grid item>
                              <Avatar rounded size='xl' />
                            </Grid>
                            <Grid item grow>
                              <Grid container direction='column' spacing={2}>
                                <Grid item>
                                  <Grid container direction='column'>
                                    {/* 通知標題與時間 */}
                                    <Grid item>
                                      <Grid container alignItems='center' justifyContent='between' spacing={2}>
                                        <Grid item grow>
                                          <Grid container spacing={2}>
                                            <Grid item>
                                              <Text
                                                component='span'
                                                overflow='hidden'
                                                textOverflow='ellipsis'
                                                variant='sm'
                                                weight='semibold'
                                                whiteSpace='nowrap'
                                              >
                                                {notification.author} {notification.action}
                                              </Text>
                                            </Grid>
                                            <Grid item>
                                              <Text
                                                color='typography-tertiary'
                                                component='span'
                                                overflow='hidden'
                                                textOverflow='ellipsis'
                                                variant='sm'
                                                whiteSpace='nowrap'
                                              >
                                                {notification.time}
                                              </Text>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          {!notification.isRead && <LegendMarker color='error' disableGutters />}
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    {/* 問題標題 */}
                                    <Grid item>
                                      <Text variant='sm'>{notification.title}</Text>
                                    </Grid>

                                    {/* 問題編號 */}
                                    <Grid item>
                                      <Text color='typography-tertiary' variant='xs'>
                                        {notification.issueNumber} •{' '}
                                        {t(
                                          'status.inProgressStatus.label',
                                          notification.status || 'In Progress',
                                          'Status.',
                                        )}
                                      </Text>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                {/* 評論列表 */}
                                {notification.comments && notification.comments.length > 0 && (
                                  <Grid item onClick={(e) => e.stopPropagation()}>
                                    <Grid container direction='column' spacing={1}>
                                      {notification.comments.map((comment) => (
                                        <Grid item key={comment.commentId}>
                                          <Paper color='surface-02'>
                                            <CardContent size='xxs' className={styles['comment-item']}>
                                              <Text variant='sm' className={styles['comment-text']}>
                                                <Text component='span' variant='xs' weight='semibold'>
                                                  @{comment.author.firstName} {comment.author.lastName}
                                                </Text>{' '}
                                                {comment.text.replace(/<[^>]*>/g, '')}
                                              </Text>
                                            </CardContent>
                                          </Paper>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </Grid>
                                )}

                                {/* 沒有評論的狀態 */}
                                {(!notification.comments || notification.comments.length === 0) &&
                                  !isLoadingComments[notification.id] && (
                                    <Grid item onClick={(e) => e.stopPropagation()}>
                                      <Text variant='sm' color='typography-tertiary'>
                                        {t('notification.noComment.label', 'No Comments', 'No Comments yet')}
                                      </Text>
                                    </Grid>
                                  )}
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  {/* 固定顯示"..."按鈕，不設置任何條件 */}
                  <CardHeader borderBottom className={styles['view-more-header']}>
                    <Button variant='link' onClick={handleViewAllClick} className={styles['dots-button']}>
                      <span>{t('general.viewAll.label', 'View All', 'View all notifications.')}</span>
                    </Button>
                  </CardHeader>
                </Card>
              </MenuList>
            </Menu>
          )}
          <UserInfo />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
