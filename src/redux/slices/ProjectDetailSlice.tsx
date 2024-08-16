import {
  addPhase,
  getProjectDetail,
  deletePhase,
  finishPhase,
  getPhaseInProject,
} from "@/api/Project";
import { arrayMove } from "@dnd-kit/sortable";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectDetail: [],
  phase: [],
  activeId: null,
  projectName: "",
  studentName: "",
  mentor: "",
  description: "",
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

export const findItemById = (id, state) => {
  for (const container of state.projectDetail) {
    const item = container.list.find((item) => item.id === id);
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
    setNullError: (state) => {
      state.error = null;
    },
    addNewPhase: (state, action) => {
      const { id, title } = action.payload;
      // state.phase = [...state.phase, { id, title }];
    },
    addItemInList: (state, action) => {
      const { items: containerId, title } = action.payload;
      const container = state.projectDetail.find(
        (item) => item.id === containerId
      );
      if (container) {
        const taskId = `task-${(((1 + Math.random()) * 0x10000) | 0)
          .toString(16)
          .substring(1)}`;
        container.list.push({
          title,
          id: taskId,
          detail: { description: "", fileList: [], comment: [] },
        });
      }
    },
    addNewBoard: (state, action) => {
      const newBoardId = `container-${(((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1)}`;
      state.projectDetail.push({
        id: newBoardId,
        title: action.payload.title,
        list: [],
      });
      state.activeId = newBoardId;
    },
    deleteBoard: (state, action) => {
      const { boardId } = action.payload;
      state.projectDetail = state.projectDetail.filter(
        (item) => item.id !== boardId
      );
    },
    deleteTask: (state, action) => {
      const { containerId, taskId } = action.payload;
      const container = state.projectDetail.find(
        (item) => item.id === containerId
      );
      if (container) {
        container.list = container.list.filter((task) => task.id !== taskId);
      }
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
        const activeItemIndex = activeContainer.list.indexOf(activeItem);
        const overItemIndex = overContainer.list.indexOf(overItem);

        if (activeContainerIndex === overContainerIndex) {
          // Reorder items within the same container
          const newItems = state.projectDetail;
          newItems[activeContainerIndex] = {
            ...newItems[activeContainerIndex],
            list: arrayMove(
              newItems[activeContainerIndex].list,
              activeItemIndex,
              overItemIndex
            ),
          };
          state.projectDetail = newItems;
        } else {
          // Move item between different containers
          const newItems = state.projectDetail;
          const [movedItem] = newItems[activeContainerIndex].list.splice(
            activeItemIndex,
            1
          );
          newItems[overContainerIndex] = {
            ...newItems[overContainerIndex],
            list: [...newItems[overContainerIndex].list, movedItem],
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
        const [movedItem] = newItems[activeContainerIndex].list.splice(
          newItems[activeContainerIndex].list.indexOf(activeItem),
          1
        );
        newItems[overContainerIndex] = {
          ...newItems[overContainerIndex],
          list: [...newItems[overContainerIndex].list, movedItem],
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
        ].list.splice(activeContainer.list.indexOf(activeItem), 1);

        // Log task move into a container
        console.log("Task moved into container", {
          taskId: active.id,
          fromContainerId: activeContainer.id,
          toContainerId: overContainer.id,
          fromIndex: activeContainer.list.indexOf(activeItem),
          toIndex: state.projectDetail[overContainerIndex].list.length,
        });

        state.projectDetail[overContainerIndex].list.push(movedItem);
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
        const activeItemIndex = activeContainer.list.indexOf(activeItem);
        const overItemIndex = overContainer.list.indexOf(overItem);

        if (activeContainerIndex === overContainerIndex) {
          // Log task reordering within the same container
          console.log("Task reordered", {
            taskId: active.id,
            containerId: activeContainer.id,
            fromIndex: activeItemIndex,
            toIndex: overItemIndex,
          });

          // Reorder items within the same container
          state.projectDetail[activeContainerIndex].list = arrayMove(
            state.projectDetail[activeContainerIndex].list,
            activeItemIndex,
            overItemIndex
          );
        } else {
          // Log task move between different containers
          console.log("Task moved between containers", {
            taskId: active.id,
            fromContainerId: activeContainer.id,
            toContainerId: overContainer.id,
            fromIndex: activeItemIndex,
            toIndex: state.projectDetail[overContainerIndex].list.length,
          });

          // Move item between different containers
          const [movedItem] = state.projectDetail[
            activeContainerIndex
          ].list.splice(activeItemIndex, 1);
          state.projectDetail[overContainerIndex].list.push(movedItem);
        }
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
      const findTask = copyProjectDetail[findContainer].list.findIndex(
        (item) => item.id === taskId
      );
      copyProjectDetail[findContainer].list[findTask].detail.fileList =
        copyProjectDetail[findContainer].list[findTask].detail.fileList.filter(
          (file) => file.url !== url
        );
      state.projectDetail = copyProjectDetail;
    },
    commentTask: (state, action) => {
      const { containerId, taskId, comment, role } = action.payload;
      const copyProjectDetail = state.projectDetail;
      const findContainer = copyProjectDetail.findIndex(
        (item) => item.id === containerId
      );
      const findTask = copyProjectDetail[findContainer].list.findIndex(
        (item) => item.id === taskId
      );
      copyProjectDetail[findContainer].list[findTask].detail.comment.push({
        comment,
        role,
      });
      state.projectDetail = copyProjectDetail;
    },
    //Call API to handle detail
    updateDescriptionTask: (state, action) => {
      const { containerId, taskId, description } = action.payload;
      const copyProjectDetail = state.projectDetail;
      const findContainer = copyProjectDetail.findIndex(
        (item) => item.id === containerId
      );
      const findTask = copyProjectDetail[findContainer].list.findIndex(
        (item) => item.id === taskId
      );
      copyProjectDetail[findContainer].list[findTask].detail.description =
        description;
      state.projectDetail = copyProjectDetail;
    },
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(fetchProject.pending, (state, action) => {
    //   state.loading = true;
    //   state.studentName = "";
    //   state.projectName = "";
    //   state.mentor = "";
    //   state.description = "";
    //   state.phase = [];
    // })
    // .addCase(fetchProject.fulfilled, (state, action) => {
    //   state.studentName = action.payload.studentName;
    //   state.projectName = action.payload.projectName;
    //   state.mentor = action.payload.mentor;
    //   state.description = action.payload.description;
    // });
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
  },
});

export const {
  addItemInList,
  addNewBoard,
  deleteBoard,
  deleteTask,
  setProjectDetail,
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  handleSetProjectName,
  updateDescriptionTask,
  deleteImage,
  commentTask,
  addNewPhase,
  setNullError,
} = projectDetailSlice.actions;

export default projectDetailSlice.reducer;
