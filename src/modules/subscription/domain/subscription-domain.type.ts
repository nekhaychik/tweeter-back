export interface CreateSubscriptionParameters {
  subscriberId: string;
  userId: string;
}

export interface GetAllSubscriptionsParameters {
  subscriberId: string;
}

export interface GetAllSubscribersParameters {
  userId: string;
}

export interface GetSubscriptionParameters {
  subscriberId: string;
  userId: string;
}

export interface DeleteSubscriptionParameters {
  subscriberId: string;
  userId: string;
}
