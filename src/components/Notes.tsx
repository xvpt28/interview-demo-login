import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { addNotes, deleteNotes, updateNotes } from "../api/notes";
import { showMessage } from "../utils/tools";

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
  const [isEditing, setIsEditing] = React.useState(createModel);
  const [formData, setFormData] = React.useState({ title, content, id });

  const renderText = (
    <>
      <h2 className="card-title h-8">{title}</h2>
      <p className="overflow-hidden whitespace-nowrap text-ellipsis h-8">
        {content}
      </p>
    </>
  );

  const renderEdit = (
    <form className="flex flex-col">
      <input
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, title: e.target.value }));
        }}
        value={formData.title}
        type="text"
        placeholder="Type title here"
        className="input input-bordered  max-w-xs input-sm  mb-3"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, content: e.target.value }))
        }
        value={formData.content}
        type="text"
        placeholder="Type description here"
        className="input input-bordered w-full input-sm "
      />
    </form>
  );

  const onSubmit = () => {
    setIsEditing(false);
    if (createModel) {
      addNotes(formData);
      onCancelAdd && onCancelAdd();
      showMessage("Note added successfully", "success");
    } else {
      updateNotes(formData, id);
      showMessage("Note updated successfully", "success");
    }
    triggerRefresh();
  };

  const onDelete = () => {
    if (createModel) {
      onCancelAdd && onCancelAdd();
    } else {
      deleteNotes(id);
      triggerRefresh();
      showMessage("Note deleted successfully", "info");
    }
  };

  return (
    <div>
      <div className="card w-[600px] h-[180px] bg-base-100 shadow-xl">
        <div className="card-body">
          {isEditing ? renderEdit : renderText}
          <div className="card-actions justify-end">
            {isEditing && (
              <button
                onClick={onSubmit}
                className="btn btn-square btn-outline btn-sm btn-success"
              >
                <Icon className="text-lg" icon="line-md:confirm" />
              </button>
            )}
            {createModel || (
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className={`btn btn-square btn-outline btn-sm ${
                  isEditing && "btn-error"
                }`}
              >
                <Icon
                  className="text-lg"
                  icon={isEditing ? "iconoir:cancel" : "material-symbols:edit"}
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
        </div>
      </div>
    </div>
  );
};

export default Notes;