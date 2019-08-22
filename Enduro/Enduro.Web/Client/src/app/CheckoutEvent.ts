export class CheckoutEvent {
  constructor(public ownerId,

    public carMake,
    public carModel,
    public carYear,
    public rentFrom,
    public rentTo,
    public locationPickup,
    public tripPerDay,
    public carProfilePicture) {
  }
}
