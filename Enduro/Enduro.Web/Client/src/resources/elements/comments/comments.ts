import { User } from './../../../user/account';
import { ApiService } from './../../../shared/ApiService';
import { autoinject, bindable } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshEvent } from 'shared/RefreshEvent';
import * as $ from 'jquery';

@autoinject
export class Comments {

  @bindable carid: any;
  @bindable listofcomments: any;
  @bindable comments: any; //got from car-details
  comment: any;
  user: User;
  commentsection: HTMLElement;
  UserImage: any;

  userComment: any;
  counter: any;
  testimage: any;

  userId:any;
  constructor(private api: ApiService, private eventAggregator: EventAggregator) {
    this.eventAggregator = eventAggregator;
    this.UserImage = [];
  }
  async activate() {
  }

  async attached() {
    let response = await this.api.getCurrentUser();
    this.userId = response.id;
  }


  async addComment() {
    let response = await this.api.post(`/cars/${this.carid}/comments`,
      {
        message: this.comment,
        // userId: "bc267bfd-09ce-4dfa-95b2-c01be7b56a02"
        userId: this.userId
      }).then(() => {
        $(this.commentsection).val("");
        this.eventAggregator.publish(new RefreshEvent);
      });
  }

  async removeComment(comment) {
    let response = await this.api.post(`/cars/comments/${comment}`, {
      userId: this.userId,
      carId: this.carid
    }).then(() => {
      this.eventAggregator.publish(new RefreshEvent);
    })
  }
  //TODO
  // async userProfilePicture(userId) {
  //   this.user = new User(await this.api.get(`/users/${userId}`));
  //   return await `/storage/${this.user.avatarUri.container}/${this.user.avatarUri.file}?` + Date.now();
  // }
}
