import {
  addPhase,
  getProjectDetail,
  deletePhase,
  finishPhase,
  getPhaseInProject,
  getDataInPhase,
  addBoard,
  updateBoardPosition,
  addTask,
  updateTaskPosition,
  deleteTaskById,
  commentTask,
  getTaskById,
  updateDescriptionTaskById,
} from "@/api/Project";
import { arrayMove } from "@dnd-kit/sortable";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectDetail: [],
  phase: [],
  detailTask: {
    taskId: "",
    taskName: "",
    taskDescription: "",
    filePdf: "",
    fileName: "",
    commentViewList: [
      {
        role: "",
        comment: "",
      },
    ],
  },
  activeId: null,
  projectName: "",
  loading: false,
  error: null,
};

export const fetchProject = createAsyncThunk(
  "project-slice/fetchProject",
  async () => {
    return await getProjectDetail();
  }
);

export const addPhaseThunk = createAsyncThunk(
  "project-slice/addPhase",
  async (formData: object) => {
    return await addPhase(formData);
  }
);

export const removePhase = createAsyncThunk(
  "project-slice/removePhase",
  async () => {
    return await deletePhase();
  }
);

export const finishingPhase = createAsyncThunk(
  "project-slice/finishPhase",
  async () => {
    return await finishPhase();
  }
);

export const getPhase = createAsyncThunk("project-slice/getPhase", async () => {
  return await getPhaseInProject();
});

export const getBoard = createAsyncThunk(
  "project-slice/getBoard",
  async (phaseId: string) => {
    return await getDataInPhase(phaseId);
  }
);

export const createBoard = createAsyncThunk(
  "project-slice/createBoard",
  async (form: { phaseId: string; nameBoard: string }) => {
    const id = await addBoard(form);
    return { id, title: form.nameBoard };
  }
);

export const addNewTask = createAsyncThunk(
  "project-slice/addNewTask",
  async (form: { boardId: string; taskName: string }) => {
    const id = await addTask(form);
    return { id, taskName: form.taskName, containerId: form.boardId };
  }
);

export const deleteTask = createAsyncThunk(
  "project-slice/deleteTask",
  async (form: { containerId: string; taskId: string }) => {
    await deleteTaskById(form.taskId);
    return form;
  }
);

export const createComment = createAsyncThunk(
  "project-slice/createComment",
  async (form: {
    containerId: string;
    taskId: string;
    content: string;
    role: string;
  }) => {
    await commentTask(form);
    return form;
  }
);

export const getDetailTask = createAsyncThunk(
  "project-slice/getDetailTask",
  async (id: string) => {
    return await getTaskById(id);
  }
);

export const findItemById = (id, state) => {
  for (const container of state.projectDetail) {
    const item = container.task.find((item) => item.id === id);
    if (item) return { container, item };
  }
  return null;
};

const findContainerById = (id, state) =>
  state.projectDetail.find((container) => container.id === id);

const projectDetailSlice = createSlice({
  name: "project-slice",
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.detailTask = {
        taskId: "",
        taskName: "",
        taskDescription: "",
        filePdf: "",
        fileName: "",
        commentViewList: [
          {
            role: "",
            comment: "",
          },
        ],
      };
    },
    clearPhase: (state) => {
      state.projectDetail = [];
    },
    logout: (state) => {
      state.projectDetail = [];
      state.phase = [];
    },
    setNullError: (state) => {
      state.error = null;
    },
    addNewPhase: (state, action) => {
      const { id, title } = action.payload;
      // state.phase = [...state.phase, { id, title }];
    },
    deleteBoard: (state, action) => {
      const { boardId } = action.payload;
      state.projectDetail = state.projectDetail.filter(
        (item) => item.id !== boardId
      );
    },
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
    },
    handleDragOver: (state, action) => {
      const { active, over } = action.payload.event;

      if (!over) return;

      // Check if the dragged item is over a different item
      if (active.id.startsWith("task-") && over.id.startsWith("task-")) {
        const { container: activeContainer, item: activeItem } =
          findItemById(active.id, state) || {};
        const { container: overContainer, item: overItem } =
          findItemById(over.id, state) || {};

        if (!activeContainer || !overContainer) return;

        const activeContainerIndex =
          state.projectDetail.indexOf(activeContainer);
        const overContainerIndex = state.projectDetail.indexOf(overContainer);
        const activeItemIndex = activeContainer.task.indexOf(activeItem);
        const overItemIndex = overContainer.task.indexOf(overItem);

        if (activeContainerIndex === overContainerIndex) {
          // Reorder items within the same container
          const newItems = state.projectDetail;
          newItems[activeContainerIndex] = {
            ...newItems[activeContainerIndex],
            task: arrayMove(
              newItems[activeContainerIndex].task,
              activeItemIndex,
              overItemIndex
            ),
          };
          state.projectDetail = newItems;
        } else {
          // Move item between different containers
          const newItems = state.projectDetail;
          const [movedItem] = newItems[activeContainerIndex].task.splice(
            activeItemIndex,
            1
          );
          newItems[overContainerIndex] = {
            ...newItems[overContainerIndex],
            task: [...newItems[overContainerIndex].task, movedItem],
          };
          state.projectDetail = newItems;
        }
      }

      // Check if the dragged item is over a container
      if (active.id.startsWith("task-") && over.id.startsWith("container-")) {
        const { container: activeContainer, item: activeItem } =
          findItemById(active.id, state) || {};
        const overContainer = findContainerById(over.id, state);

        if (!activeContainer || !overContainer) return;

        const newItems = state.projectDetail;
        const activeContainerIndex =
          state.projectDetail.indexOf(activeContainer);
        const overContainerIndex = state.projectDetail.indexOf(overContainer);
        const [movedItem] = newItems[activeContainerIndex].task.splice(
          newItems[activeContainerIndex].task.indexOf(activeItem),
          1
        );
        newItems[overContainerIndex] = {
          ...newItems[overContainerIndex],
          task: [...newItems[overContainerIndex].task, movedItem],
        };

        state.projectDetail = newItems;
      }
    },
    handleDragEnd: (state, action) => {
      const { active, over } = action.payload.event;
      if (!over) return;

      // Moving a task into a container
      if (active.id.startsWith("task-") && over.id.startsWith("container-")) {
        const { container: activeContainer, item: activeItem } =
          findItemById(active.id, state) || {};
        const overContainer = findContainerById(over.id, state);

        if (!activeContainer || !overContainer) return;

        const activeContainerIndex =
          state.projectDetail.indexOf(activeContainer);
        const overContainerIndex = state.projectDetail.indexOf(overContainer);

        const [movedItem] = state.projectDetail[
          activeContainerIndex
        ].task.splice(activeContainer.task.indexOf(activeItem), 1);

        // Log task move into a container
        console.log("Task moved into container", {
          taskId: active.id,
          fromContainerId: activeContainer.id,
          toContainerId: overContainer.id,
          fromIndex: activeContainer.task.indexOf(activeItem),
          toIndex: state.projectDetail[overContainerIndex].task.length,
        });
        updateTaskPosition({
          taskId: active.id.split("task-")[1],
          newPosition: state.projectDetail[overContainerIndex].task.length + 1,
          newBoard: activeContainer.id.split("container-")[1],
        });
        state.projectDetail[overContainerIndex].task.push(movedItem);
        state.activeId = null;
        return;
      }

      // Task sorting within the same container or moving to another container
      if (active.id.startsWith("task-") && over.id.startsWith("task-")) {
        const { container: activeContainer, item: activeItem } =
          findItemById(active.id, state) || {};
        const { container: overContainer, item: overItem } =
          findItemById(over.id, state) || {};

        if (!activeContainer || !overContainer) return;

        const activeContainerIndex =
          state.projectDetail.indexOf(activeContainer);
        const overContainerIndex = state.projectDetail.indexOf(overContainer);
        const activeItemIndex = activeContainer.task.indexOf(activeItem);
        const overItemIndex = overContainer.task.indexOf(overItem);

        if (activeContainerIndex === overContainerIndex) {
          // Log task reordering within the same container
          console.log("Task reordered", {
            taskId: active.id,
            containerId: activeContainer.id,
            fromIndex: activeItemIndex,
            toIndex: overItemIndex,
          });
          updateTaskPosition({
            taskId: active.id.split("task-")[1],
            newPosition: overItemIndex + 1,
            newBoard: activeContainer.id.split("container-")[1],
          });
          state.projectDetail[activeContainerIndex].task = arrayMove(
            state.projectDetail[activeContainerIndex].task,
            activeItemIndex,
            overItemIndex
          );
        }
        // else {
        //   // Log task move between different containers
        //   console.log("Task moved between containers", {
        //     taskId: active.id,
        //     fromContainerId: activeContainer.id,
        //     toContainerId: overContainer.id,
        //     fromIndex: activeItemIndex,
        //     toIndex: state.projectDetail[overContainerIndex].task.length,
        //   });

        //   // Move item between different containers
        //   const [movedItem] = state.projectDetail[
        //     activeContainerIndex
        //   ].task.splice(activeItemIndex, 1);
        //   state.projectDetail[overContainerIndex].task.push(movedItem);
        // }
      }

      // Container sorting
      if (
        active.id.startsWith("container-") &&
        over.id.startsWith("container-")
      ) {
        const activeIndex = state.projectDetail.findIndex(
          (container) => container.id === active.id
        );
        const overIndex = state.projectDetail.findIndex(
          (container) => container.id === over.id
        );

        // Log container change
        console.log("Container moved", {
          containerId: active.id,
          fromIndex: activeIndex,
          toIndex: overIndex,
        });
        updateBoardPosition({
          boardId: active.id.split("container-")[1],
          newPosition: overIndex + 1,
        });
        state.projectDetail = arrayMove(
          state.projectDetail,
          activeIndex,
          overIndex
        );
      }

      state.activeId = null;
    },
    handleDragStart: (state, action) => {
      state.activeId = action.payload.event.active.id;
    },
    handleSetProjectName: (state, action) => {
      state.projectName = action.payload.projectName;
    },
    deleteImage: (state, action) => {
      const { url, containerId, taskId } = action.payload;
      const copyProjectDetail = state.projectDetail;
      const findContainer = copyProjectDetail.findIndex(
        (item) => item.id === containerId
      );
      const findTask = copyProjectDetail[findContainer].task.findIndex(
        (item) => item.id === taskId
      );
      copyProjectDetail[findContainer].task[findTask].detail.fileList =
        copyProjectDetail[findContainer].task[findTask].detail.fileList.filter(
          (file) => file.url !== url
        );
      state.projectDetail = copyProjectDetail;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPhaseThunk.fulfilled, (state, action) => {
      state.phase.push(action.payload);
    });
    builder.addCase(removePhase.fulfilled, (state, action) => {
      state.phase.pop();
    });
    builder.addCase(finishingPhase.fulfilled, (state, action) => {
      state.phase[state.phase.length - 1].completed = true;
    });
    builder.addCase(getPhase.fulfilled, (state, action) => {
      state.phase = action.payload;
    });
    builder.addCase(getBoard.fulfilled, (state, action) => {
      console.log(action.payload.board);

      state.projectDetail = action.payload.board;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.projectDetail.push({
        id: `container-${action.payload.id.boardId}`,
        title: action.payload.title,
        task: [],
      });
      state.activeId = `container-${action.payload.id.boardId}`;
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      const { id, taskName, containerId } = action.payload;

      const container = state.projectDetail.find(
        (item) => item.id === `container-${containerId}`
      );

      if (container) {
        container.task.push({
          taskName,
          id: `task-${id.taskId}`,
        });
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { containerId, taskId } = action.payload;
      const container = state.projectDetail.find(
        (item) => item.id === `container-${containerId}`
      );
      if (container) {
        container.task = container.task.filter(
          (task) => task.id !== `task-${taskId}`
        );
      }
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      const { containerId, taskId, content, role } = action.payload;
      const copyProjectDetail = state.projectDetail;
      const findContainer = copyProjectDetail.findIndex(
        (item) => item.id === containerId
      );
      if (findContainer !== -1) {
        const findTask = copyProjectDetail[findContainer].task.findIndex(
          (item) => item.id === `task-${taskId}`
        );
        if (findTask !== -1) {
          if (
            copyProjectDetail[findContainer].task[findTask]?.comment !==
            undefined
          ) {
            copyProjectDetail[findContainer].task[findTask].comment += 1;
          } else {
            copyProjectDetail[findContainer].task[findTask].comment = 1;
          }
        }
      }
      state.detailTask.commentViewList.push({ role, comment: content });
      state.projectDetail = copyProjectDetail;
    });
    builder.addCase(getDetailTask.fulfilled, (state, action) => {
      state.detailTask = action.payload;
    });
  },
});

export const {
  deleteBoard,
  setProjectDetail,
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  handleSetProjectName,
  deleteImage,
  addNewPhase,
  setNullError,
  logout,
  clearPhase,
  clearDetail,
} = projectDetailSlice.actions;

export default projectDetailSlice.reducer;
