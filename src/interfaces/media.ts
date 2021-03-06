export interface Media {
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
  thumbnails?: Thumbnail;
}

export interface Thumbnail {
  w160: string;
  w320: string;
  w640: string;
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
  token: string;
  user: User;
}

export interface Login {    // LoginResponse
  user_id?: number;
  username: string;
  password?: string;
  token: string;
  user: User;
}

export interface UserCreated {  // RegisterResponse
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}
export interface UserExists {   // CheckIfUserExists
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}
