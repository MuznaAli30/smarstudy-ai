export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskBody {
  title: string;
}

export interface UpdateTaskBody {
  id: string;
  completed: boolean;
}

export interface DeleteTaskBody {
  id: string;
}
