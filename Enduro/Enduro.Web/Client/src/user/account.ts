import { UserAvatarChanged } from './../shared/UserAvatarChanged';
import { autoinject, observable } from "aurelia-framework";
import { ApiService } from "shared/ApiService";
import { ChangeEmailRequest } from "shared/ChangeEmailRequest";
import { ChangePasswordRequest } from "shared/ChangePasswordRequest";
import { ChangeDetailsRequest } from "shared/ChangeDetailsRequest";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class Account{
    selectedFiles: FileList;
    changeEmailRequest: ChangeEmailRequest;
    changePasswordRequest: ChangePasswordRequest;
    changeDetailsRequest: ChangeDetailsRequest;
    currentUser: User;
    genders = ["Male", "Female", "Other"];
    @observable currentUserAvatar;
    picture:any;
    currentUserId:any;
    testUser:any;
    constructor(private api: ApiService, private eventAggregator: EventAggregator) {
        this.changeEmailRequest = new ChangeEmailRequest();
        this.changePasswordRequest = new ChangePasswordRequest();
        this.changeDetailsRequest = new ChangeDetailsRequest();
    }

    async activate() {
      let response = await this.api.getCurrentUser();
      this.currentUserId = response.id;
      this.currentUser = new User(await this.api.get(`/users/${this.currentUserId}`));
      this.currentUserAvatar = `${this.currentUser.avatarSrc}?` + Date.now();
    }

    async upload() {
        let formData = new FormData();
        for (let i = 0; i < this.selectedFiles.length; i++) {
            formData.append(`files[${i}]`, this.selectedFiles[i]);
        }
        await this.api.upload("/upload/user", formData);
        await this.changeUserAvatar();
        this.selectedFiles = null;
    }

    
    private async changeUserAvatar() {
      this.currentUser = new User(await this.api.get(`/users/${this.currentUserId}`));
      this.currentUserAvatar = `${this.currentUser.avatarSrc}?` + Date.now(); //Date appendend to invalidate browser cache
      this.eventAggregator.publish(new UserAvatarChanged(this.currentUser.avatarSrc));
    }

    // async changeEmail() {
    //     let response = await this.api.put("/users/changeEmail", this.changeEmailRequest);

    //     if (response.errors) {
    //         console.log(response.errors);
    //     }

    //     this.ea.publish(new UserEmailChanged(this.changeEmailRequest.email));
    //     return false;
    // }

    // async changePassword() {
    //     let response = await this.api.put("/users/changePassword", this.changePasswordRequest);

    //     if (response.errors) {
    //         console.log(response.errors);
    //     }

    //     return false;
    // }

    // async changeDetails() {
    //     let response = await this.api.put("/users/changeDetails", this.changeDetailsRequest);

    //     if (response.errors) {
    //         console.log(response.errors);
    //     }

    //     this.ea.publish(new UserDetailsChanged(this.changeDetailsRequest.fullName, this.changeDetailsRequest.location,
    //         this.changeDetailsRequest.gender, this.changeDetailsRequest.birthday));

    //     return false;
    // }

    // get emailAndPasswordNotEmpty() {
    //     return this.changeEmailRequest.email &&
    //         this.changeEmailRequest.password;
    // }

    // get passwordsNotEmpty() {
    //     return this.changePasswordRequest.oldPassword &&
    //         this.changePasswordRequest.newPassword &&
    //         this.changePasswordRequest.confirmNewPassword;
    // }

    // get userDetailsNotEmpty() {
    //     return this.changeDetailsRequest.fullName &&
    //         this.changeDetailsRequest.location;
    // }
}

export class User {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth:any;
  mobileNumber:string;
  addressNo:any;
  embg:any;
  gender:any;
  review:any;
  profitMade:any;
  avatarUri: AvatarUri;
  
  constructor(json: any) {
      this.id = json.id;
      this.fullName = json.fullName;
      this.email = json.email;
      this.avatarUri = json.avatarUri
  }

  public get avatarSrc(): string {
      if (this.avatarUri !== undefined) {
          return `/storage/${this.avatarUri.container}/${this.avatarUri.file}`;
      }
  }
}

export class AvatarUri {
  container: string;
  file: string;
}
