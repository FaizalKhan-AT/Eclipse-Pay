import { TOASTER_TYPE } from "../enums";

export function getToastData(data: any) {
  switch (data.status) {
    case TOASTER_TYPE.SUCCESS:
      return {
        description: data.data,
      };
    case TOASTER_TYPE.ERROR:
      return {
        variant: "destructive",
        title: "Uh oh!",
        description: data.error,
      };
    default:
      return;
  }
}
