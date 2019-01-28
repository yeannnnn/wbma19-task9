export interface Media {//  Pic
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail; // object
}

export interface Thumbnail {
  w160: string;
  w320?: string;
  w640?: string;
}

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}

export interface LoginResponse {
  message: string;
  user_id: number;
  user: User;
  token: string;
}
export interface CheckUserName {
  message: string;
}
/*
export interface RegisteredResponse {
  message: string;
  user_id: number;
}
*/
