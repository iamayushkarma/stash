import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import {
  CircleUserRound,
  Mail,
  Calendar,
  Shield,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/ui/Buttons/Button";
import { useUpdateUser } from "../../hooks/useUpdateUser";

function UserAccount() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const { updateUser, isUpdating, error } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const handleSave = async () => {
    setUpdateError(null);
    setUpdateSuccess(false);

    // Validation
    if (!formData.username.trim()) {
      setUpdateError("Username cannot be empty");
      return;
    }

    if (user?.authType !== "google" && !formData.email.trim()) {
      setUpdateError("Email cannot be empty");
      return;
    }

    try {
      const response = await updateUser(formData);

      // Update the user context with new data
      if (response.data) {
        setUser(response.data);
      }

      setUpdateSuccess(true);
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setUpdateError(err.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen text-text-light-primary dark:text-text-dark-primary py-5 px-3 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="p-2 rounded-lg hover:bg-bg-light-secondary dark:hover:bg-bg-dark-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-semibold">Account Settings</h1>
      </div>

      {/* Success Message */}
      {updateSuccess && (
        <div className="max-w-3xl mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-sm text-green-800 dark:text-green-200">
            Account updated successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {(updateError || error) && (
        <div className="max-w-3xl mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-800 dark:text-red-200">
            {updateError || error}
          </p>
        </div>
      )}

      {/* Account Info Card */}
      <div className="max-w-3xl">
        <div className="bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark rounded-lg p-6 md:p-8">
          {/* Profile Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user?.username
                    ?.split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </h2>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm">
                  {user?.authType === "google"
                    ? "Google Account"
                    : "Local Account"}
                </p>
              </div>
            </div>
            {!isEditing && user?.authType !== "google" && (
              <Button
                onClick={() => setIsEditing(true)}
                text="Edit Profile"
                className="text-sm!"
              />
            )}
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
                <CircleUserRound className="w-4 h-4" />
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="px-4 py-2 rounded-lg bg-bg-light-secondary/50 dark:bg-bg-dark-secondary/50">
                  {user?.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {isEditing && user?.authType !== "google" ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="px-4 py-2 rounded-lg bg-bg-light-secondary/50 dark:bg-bg-dark-secondary/50">
                  {user?.email}
                </p>
              )}
            </div>

            {/* Auth Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
                <Shield className="w-4 h-4" />
                Authentication Type
              </label>
              <p className="px-4 py-2 rounded-lg bg-bg-light-secondary/50 dark:bg-bg-dark-secondary/50 capitalize">
                {user?.authType}
              </p>
            </div>

            {/* Account Created */}
            {user?.createdAt && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary">
                  <Calendar className="w-4 h-4" />
                  Account Created
                </label>
                <p className="px-4 py-2 rounded-lg bg-bg-light-secondary/50 dark:bg-bg-dark-secondary/50">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-8">
              <Button
                onClick={handleSave}
                text={isUpdating ? "Saving..." : "Save Changes"}
                disabled={isUpdating}
                className="flex-1!"
              />
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setUpdateError(null);
                  setFormData({
                    username: user?.username || "",
                    email: user?.email || "",
                  });
                }}
                text="Cancel"
                disabled={isUpdating}
                className="flex-1! bg-transparent! border border-border-light dark:border-border-dark! text-text-light-primary dark:text-text-dark-primary! hover:bg-bg-light-secondary dark:hover:bg-bg-dark-secondary!"
              />
            </div>
          )}
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {user?.authType === "google"
              ? "Your account is managed through Google. Some settings can only be changed in your Google account."
              : "Keep your account information up to date to ensure the best experience."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
