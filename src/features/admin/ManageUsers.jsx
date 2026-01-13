import React from "react";
import { Users, Mail, Calendar, Shield, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} from "./usersApiSlice";
import Spinner from "../../components/common/Spinner";
import { formatDate } from "../../utils/helpers";
import { useCRUDOperations } from "../../hooks/useCRUDOperations";
import { ManagementPageLayout } from "./components/ManagementPageLayout";
import { StatsCard } from "./components/StatsCard";
import { DataTable } from "./components/DataTable";
import { ActionButtons } from "./components/ActionButtons";
import { DeleteDialog } from "./components/DeleteDialog";
import EditUserModal from "../modalComponents/SubmissionLogic/EditUserModal";
import AddUserModal from "../modalComponents/SubmissionLogic/AddUserModal";
import { useModalState } from "../../hooks/useModalState";

const ManageUsers = () => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const {
    editingItem: editingUser,
    showDeleteModal,
    itemToDelete: userToDelete,
    isDeleting,
    handleDelete: handleDeleteClick,
    handleConfirmDelete,
    handleEdit,
    handleSaveEdit,
    handleCreate: handleCreateUser,
    setEditingItem: setEditingUser,
    setShowDeleteModal,
  } = useCRUDOperations(createUser, updateUser, deleteUser);

  const { showAddModal, setShowAddModal } = useModalState();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const admins = users?.filter((u) => u.role === "admin").length || 0;
  const regularUsers = users?.filter((u) => u.role === "user").length || 0;

  return (
    <>
      <ManagementPageLayout
        title="Manage Users"
        subtitle="View and manage all registered users"
        icon={Users}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add User"
      >
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">
                Total Users
              </p>
              <p className="text-4xl font-extrabold text-gray-900">
                {users?.length || 0}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-600">{admins} Admins</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-2">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-600">{regularUsers} Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={["Name", "Email", "Role", "Joined", "Actions"]}
          data={users}
          emptyMessage="No users found"
          emptyIcon={Users}
          renderRow={(user) => (
            <tr
              key={user._id}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {user.name}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(user.createdAt)}
                </div>
              </td>
              <td className="py-4 px-6">
                <ActionButtons
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDeleteClick(user)}
                  isEditDisabled={isUpdating}
                />
              </td>
            </tr>
          )}
        />
      </ManagementPageLayout>

      {/* Modals */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateUser}
          isSubmitting={isCreating}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEdit}
          isSubmitting={isUpdating}
        />
      )}

      <DeleteDialog
        isOpen={showDeleteModal}
        title="Delete User"
        itemName={userToDelete?.name}
        resourceType="user"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ManageUsers;
