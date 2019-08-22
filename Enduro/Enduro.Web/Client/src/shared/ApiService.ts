import { HttpClient, RequestInit } from 'aurelia-fetch-client';

//TODO Cookie instead of localStorage

export class ApiService {
  private httpClient: HttpClient;
  private baseUrl = "https://localhost:44319/api";
  private accessToken = "";
  private _refreshToken = "";
  private _isAuthenticated = false;
  // private _isAdmin: boolean;
  private _currentUserId: string;

  public persistStorage: boolean;
  constructor() {
    this.httpClient = new HttpClient();
    this.httpClient.configure(config => {
      config.withBaseUrl(this.baseUrl);
      config.withDefaults({ credentials: 'same-origin' });
      config.withInterceptor({
        response(response) {
          return response;
        },
        responseError(error) {
          return error;
        }
      })
    });
  }
  //auth 
  public get currentUserId(): string {
    return (this.persistStorage ? localStorage.getItem('currentUserId') : sessionStorage.getItem('currentUserId'));
  }

  public get isAuthenticated(): boolean {
    return (this.persistStorage ? localStorage.getItem('access_token') != null || this._isAuthenticated :
      sessionStorage.getItem('access_token') != null || this._isAuthenticated);
  }

  public get currentUserAccessToken(): string {
    return (this.persistStorage ? localStorage.getItem("access_token") : sessionStorage.getItem("access_token"));
  }

  //

  get(input: Request | string): Promise<any> {
    return this.fetch(input);
  }

  post(input: Request | string, body: any = {}): Promise<any> {
    let init: RequestInit = {
      method: "post",
      body: JSON.stringify(body)
    };
    return this.fetch(input, init);
  }

  async download(input: Request | string): Promise<any> {
    let init: RequestInit = {
      method: "get"
    };
    init.headers = {};
    return await this.fetch(input, init);
  }

  async upload(input: Request | string, body: any = {}): Promise<any> {

    let init: RequestInit = {
      method: "post",
      body: body
    };
    init.headers = {};
    // init.headers["Content-Type"] = "multipart/form-data";

    return await this.fetch(input, init);
  }

  put(input: Request | string, body: any = {}): Promise<any> {
    let init: RequestInit = {
      method: "put",
      body: JSON.stringify(body)
    };
    return this.fetch(input, init);
  }

  async patch(input: Request | string, body: any = {}): Promise<any> {
    let init: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(body)
    };
    // init.headers = {'Content-Type':'application/x-www-form-urlencoded'};
    return await this.fetch(input, init);
  }

  delete(input: Request | string): Promise<any> {
    let init: RequestInit = {
      method: "delete"
    };
    return this.fetch(input, init);
  }

  async deleteAll(input: Request | string): Promise<any> {
    let init: RequestInit = {
      method: "delete"
    };
    return await this.fetch(input, init);
  }

  shouldRetry = true;
  // private fetch(input: Request | string, init: RequestInit = {}) {

  //   return this.httpClient.fetch(input, init)
  //     .then(async httpResponse => {
  //       this.shouldRetry = true;
  //       return httpResponse.json();
  //     })
  //     .catch(errors => errors);
  // }
  //
  private fetch(input: Request | string, init: RequestInit = {}) {
    init.headers = {}; // otherwise headers are undefined

    if (this.isAuthenticated) {
      if (this.persistStorage) {
        init.headers["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`;
      } else {
        init.headers["Authorization"] = `Bearer ${sessionStorage.getItem('access_token')}`;
      }
    }

    return this.httpClient.fetch(input, init)
      .then(async httpResponse => {
        // if token exists but we get a 401, means token is expired.
        if (httpResponse.status === 401 && this.shouldRetry && this.isAuthenticated) {
          await this.refreshToken();
          this.shouldRetry = false;
          return this.fetch(input, init);
        }
        this.shouldRetry = true;
        return httpResponse.json();
      })
      .catch(errors => errors);
  }

  async getCurrentUser() {
    let currentUser = await this.fetch("/users/me");

    this._currentUserId = currentUser.id;
    // this._isAdmin = currentUser.isAdmin;

    if (this.persistStorage) {
      localStorage.setItem("currentUserId", this._currentUserId);
      // localStorage.setItem('isAdmin', String(this._isAdmin));
    } else {
      sessionStorage.setItem("currentUserId", this._currentUserId);
      // sessionStorage.setItem('isAdmin', String(this._isAdmin));
    }

    return currentUser;
  }
  //auth
  async authenticate(request: any = {}) {
    request.grant_type = "password";

    let response = await this.httpClient
      .fetch("/auth/token", {
        method: "post",
        body: JSON.stringify(request)
      })
      .then(httpResponse => httpResponse.json());

    this.accessToken = response.access_token;
    this._refreshToken = response.refresh_token;

    if (this.accessToken === undefined || this._refreshToken === undefined) {
      return;
    }

    if (this.persistStorage) {
      localStorage.setItem('access_token', this.accessToken);
      localStorage.setItem('refresh_token', this._refreshToken);
    } else {
      sessionStorage.setItem('access_token', this.accessToken);
      sessionStorage.setItem('refresh_token', this._refreshToken);
    }

    this._isAuthenticated = true;
    await this.getCurrentUser(); // write to local/session storage asap.
    return response;
  }

  private async refreshToken(request: any = {}) {
    request.grant_type = "refresh_token";
    request.refresh_token = this._refreshToken;

    let response = await this.httpClient
      .fetch("/auth/token", {
        method: "post",
        body: JSON.stringify(request)
      })

      .then(httpResponse => httpResponse.json());

    this.accessToken = response.access_token;
    this._refreshToken = response.refresh_token;

    if (this.persistStorage) {
      localStorage.setItem('access_token', this.accessToken);
      localStorage.setItem('refresh_token', this._refreshToken);
    } else {
      sessionStorage.setItem('access_token', this.accessToken);
      sessionStorage.setItem('refresh_token', this._refreshToken);
    }

    return response;
  }

  logout() {
    this.delete("/auth/token");
    (this.persistStorage) ? localStorage.clear() : sessionStorage.clear();
  }


}
