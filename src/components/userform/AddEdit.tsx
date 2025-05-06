import { UserProp } from "@/types/user.prop";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import "./AddEdit.css";

type AddEditProps = {
  closeModal: () => void;
  user?: UserProp | null;
  isAddMode: string;
};

const AddEdit = ({ closeModal, user, isAddMode }: AddEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProp>({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  });

  const { createUser, editUser } = useUserStore((state) => state);

  useEffect(() => {
    if (isAddMode === "editing") {
      if (user) {
        reset(user);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data: UserProp) => {
    try {
      if (isAddMode === "adding") {
        await createUser(data);
        reset();
        closeModal();
      } else {
        if (!user) return;
        editUser(data, user.id);
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            {...register("name", {
              required: "This field is required and cannot be empty",
              setValueAs: (value) => value.trim(),
              pattern: {
                value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                message: "Title must contain only letters and spaces",
              },
              maxLength: {
                value: 200,
                message: "Title cannot be longer than 200 characters",
              },
            })}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-input"
            {...register("email", {
              required: "This field is required and cannot be empty",
              setValueAs: (value) => value.trim(),
              pattern: {
                value: /^[A-Za-zÀ-ÿ0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Title must contain only letters and spaces",
              },
              maxLength: {
                value: 100,
                message: "Title cannot be longer than 100 characters",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Gender:</label>

          <select
            className="form-input"
            {...register("gender", {
              required: "This field is required and cannot be empty",
            })}
          >
            <option value="">--Please choose an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Status:</label>
          <div className="status-container">
            <div className="status-input-container">
              <input
                type="radio"
                value="active"
                className=""
                {...register("status", {
                  required: "This field is required and cannot be empty",
                })}
              />
              <h1 className="status-title">Active</h1>
            </div>
            <div className="status-input-container">
              <input
                type="radio"
                value="inactive"
                className=""
                {...register("status", {
                  required: "This field is required and cannot be empty",
                })}
              />
              <h1 className="status-title">Inactive</h1>
            </div>
          </div>
          {errors.status && (
            <span className="error-message">{errors.status.message}</span>
          )}
        </div>

        <div className="actions-container">
          <button type="submit" className="submit-btn">
            {isAddMode === "adding" ? "Add User" : "Edit User"}
          </button>
          <button className="cancel-button" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
