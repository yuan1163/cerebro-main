import { makeObservable, observable, action } from 'mobx';

/**
 * 閒置逾時管理器
 * 追蹤使用者活動，超過指定時間沒有活動則觸發回調
 */
export class IdleTimeoutManager {
  @observable
  private lastActivityTime: number;

  private idleTimer?: number;
  private readonly IDLE_TIMEOUT = 30 * 60 * 1000; // 30 分鐘閒置時間
  private readonly CHECK_INTERVAL = 60 * 1000; // 每分鐘檢查一次
  private onTimeout: () => void;

  constructor(onTimeout: () => void, idleTimeoutMs?: number) {
    makeObservable(this);
    this.lastActivityTime = Date.now();
    this.onTimeout = onTimeout;
    
    if (idleTimeoutMs) {
      (this as any).IDLE_TIMEOUT = idleTimeoutMs;
    }

    this.setupActivityListeners();
    this.startIdleCheck();
  }

  /**
   * 設置監聽使用者活動的事件
   */
  private setupActivityListeners() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach((event) => {
      window.addEventListener(event, this.handleActivity, { passive: true });
    });
  }

  /**
   * 處理使用者活動
   */
  @action
  private handleActivity = () => {
    this.lastActivityTime = Date.now();
  };

  /**
   * 啟動閒置檢查
   */
  private startIdleCheck() {
    this.idleTimer = window.setInterval(() => {
      const now = Date.now();
      const idleTime = now - this.lastActivityTime;

      if (idleTime >= this.IDLE_TIMEOUT) {
        console.warn('User has been idle. Logging out...');
        this.cleanup();
        this.onTimeout();
      }
    }, this.CHECK_INTERVAL);
  }

  /**
   * 停止閒置檢查
   */
  private stopIdleCheck() {
    if (this.idleTimer) {
      window.clearInterval(this.idleTimer);
      this.idleTimer = undefined;
    }
  }

  /**
   * 移除事件監聽器
   */
  private removeActivityListeners() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach((event) => {
      window.removeEventListener(event, this.handleActivity);
    });
  }

  /**
   * 清理資源
   */
  public cleanup() {
    this.stopIdleCheck();
    this.removeActivityListeners();
  }

  /**
   * 重置閒置計時器（手動呼叫）
   */
  @action
  public resetIdleTimer() {
    this.lastActivityTime = Date.now();
  }

  /**
   * 獲取剩餘的閒置時間（毫秒）
   */
  public getRemainingTime(): number {
    const now = Date.now();
    const idleTime = now - this.lastActivityTime;
    const remaining = this.IDLE_TIMEOUT - idleTime;
    return remaining > 0 ? remaining : 0;
  }
}
