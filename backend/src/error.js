// Input Error - 处理400错误 (客户端输入错误)
export class InputError extends Error {
  constructor (message) {
    super(message);
    this.name = 'InputError';
  }
}

// Access Error - 处理403错误 (权限相关错误)
export class AccessError extends Error {
  constructor (message) {
      super(message);
      this.name = 'AccessError';
  }
}

