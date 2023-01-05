interface INoticeCard { 
  title: string,
  text: string,
  editFunction: VoidFunction
  deleteFunction: VoidFunction
};

interface IPicker {
  pickerOptions: string[],
  selectedValue: string,
  onSelectedValue: (option: string) => void
};

export { INoticeCard, IPicker };