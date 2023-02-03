interface INoticeCard {
  id?: string,
  title: string,
  description: string,
  editFunction: VoidFunction
  deleteFunction: VoidFunction
};

interface INotice {
  id: string,
  title: string,
  description: string,
  schoolClass: string
};

interface IEvents {
  id: string,
  title: string,
  description: string,
  date: Date
};

interface IPicker {
  pickerOptions: string[],
  selectedValue: string,
  onSelectedValue: (option: string) => void
};

interface IMessageContainer {
  color: string,
  align: 'flex-start' | 'flex-end',
  message: string,
  hour: string
}

interface ISchedule {
  id: string,
  url: string
};

interface IMessage {
  id: string,
  message: string,
  room: string,
  author: string,
  createdAt: Date
};

interface IRelative {
  fullName: string,
  schoolClass: string
}

interface IParent {
  id: string,
  fullName: string,
  kinship: string,
  //email: string,
  relatives: IRelative[],
};

interface IContactCard {
  fullName: string,
  relativeFullName: string,
  relativeSchoolClass: string
}

interface ISolicitation {
  id: string,
  type: string,
  student: string,
  mother?: string,
  father?: string,
  phone: string,
  status: string,
  schoolClass: string,
  solicitatedAt: Date,
  changeStatusFunction: () => void
};

interface IFinishedSolicitation {
  id: string,
  type: string,
  student: string,
  mother?: string,
  father?: string,
  phone: string,
  status: string,
  schoolClass: string,
  solicitatedAt: Date,
  finishedAt: Date,
  handleDeleteNotice: () => void;
};

interface ISolicitationApi {
  id: string,
  type: string,
  student: string,
  mother?: string,
  father?: string,
  phone: string,
  status: string,
  schoolClass: string,
  solicitatedAt: Date,
  finishedAt: Date
}

interface INewsImage {
  id: string,
  imageUrl: string,
  imageId: string
}

interface INewsApi {
  id: string,
  title: string,
  url: string,
  image: INewsImage
}

interface INews {
  title: string,
  url: string,
  imageUrl: string,
  deleteFunction: () => void
}

export {
  INoticeCard,
  IPicker,
  IEvents,
  INotice,
  ISchedule,
  IMessageContainer,
  IMessage,
  IParent,
  IContactCard,
  ISolicitation,
  IFinishedSolicitation,
  ISolicitationApi,
  INews,
  INewsApi
};