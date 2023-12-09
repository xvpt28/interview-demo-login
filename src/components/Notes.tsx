// package imports
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useState } from "react";

// modules imports
import {
  addNotesApi,
  deleteNotesApi,
  getNotesApi,
  updateNotesApi,
} from "../api/notes";
import { showMessage } from "../utils/tools";
import useBoolean from "../hooks/use-Boolean";
import { setNotes } from "../redux/slices/noteSlice";
import { AppDispatch } from "../redux/store";

interface IProps {
  title: string;
  content: string;
  id: string;
  createModel?: boolean;
  onCancelAdd?: () => void;
  triggerRefresh: () => void;
}

const Notes = (props: IProps) => {
  const {
    title,
    content,
    id,
    createModel = false,
    onCancelAdd,
    triggerRefresh,
  } = props;

  const edit = useBoolean(createModel);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({ title, content, id });

  const onSubmit = () => {
    edit.setFalse();
    if (createModel) {
      addNotesApi(formData);
      const resp = getNotesApi();
      dispatch(setNotes(resp.data));
      onCancelAdd && onCancelAdd();
      showMessage("Note added successfully", "success");
    } else {
      updateNotesApi(formData, id);
      const resp = getNotesApi();
      dispatch(setNotes(resp.data));
      showMessage("Note updated successfully", "success");
    }
    triggerRefresh();
  };

  const onDelete = () => {
    if (createModel) {
      onCancelAdd && onCancelAdd();
    } else {
      deleteNotesApi(id);
      const resp = getNotesApi();
      dispatch(setNotes(resp.data));
      triggerRefresh();
      showMessage("Note deleted successfully", "info");
    }
  };

  //--------------------------------------------------------------
  // Handle views
  //--------------------------------------------------------------
  const renderText = (
    <div className="h-[80px]">
      <h2 className="card-title h-8">{title}</h2>
      <p className="overflow-hidden whitespace-nowrap text-ellipsis h-8">
        {content}
      </p>
    </div>
  );

  const renderEdit = (
    <form className="flex flex-col h-[80px]" onSubmit={onSubmit}>
      <div className="flex mb-2">
        <label className="label mr-2">
          <span className="label-text">Title</span>
        </label>
        <input
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
          value={formData.title}
          type="text"
          placeholder="Type title here"
          className="input input-bordered  max-w-xs input-sm "
        />
      </div>

      <div className="flex">
        <label className="label mr-2">
          <span className="label-text">Description</span>
        </label>
        <input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          value={formData.content}
          type="text"
          placeholder="Type description here"
          className="input input-bordered w-full input-sm "
        />
      </div>
    </form>
  );

  const renderButtons = (
    <div className="card-actions justify-end">
      {edit.value && (
        <button
          onClick={onSubmit}
          className="btn btn-square btn-outline btn-sm btn-success"
        >
          <Icon className="text-lg" icon="line-md:confirm" />
        </button>
      )}
      {createModel || (
        <button
          onClick={() => {
            edit.toggle();
            setFormData({ title, content, id });
          }}
          className={`btn btn-square btn-outline btn-sm ${
            edit.value && "btn-error"
          }`}
        >
          <Icon
            className="text-lg"
            icon={edit.value ? "iconoir:cancel" : "material-symbols:edit"}
          />
        </button>
      )}
      <button
        type="submit"
        className="btn btn-square btn-outline btn-sm"
        onClick={onDelete}
      >
        <Icon className="text-lg" icon="material-symbols:delete" />
      </button>
    </div>
  );

  return (
    <div>
      <div className="card w-[600px] h-[180px] bg-base-100 shadow-xl">
        <div className="card-body">
          {edit.value ? renderEdit : renderText}
          {renderButtons}
        </div>
      </div>
    </div>
  );
};

export default Notes;
