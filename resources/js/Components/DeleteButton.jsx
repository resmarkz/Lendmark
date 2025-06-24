import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

const DeleteButton = ({
    routeName,
    itemId,
    itemType = "item",
    itemName = "",
    className = "text-red-600 hover:text-red-900 text-sm font-medium",
    buttonText = "Delete",
    confirmText = "Are you sure you want to delete this item?",
    successMessage = "Item deleted successfully",
    onSuccess = null,
    disabled = false,
    children,
}) => {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const handleDelete = () => {
        destroy(route(routeName, itemId), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmingDeletion(false);
                if (onSuccess) onSuccess();
                if (window.toast) {
                    window.toast.success(successMessage);
                }
            },
        });
    };

    return (
        <>
            <button
                onClick={confirmDeletion}
                className={className}
                disabled={disabled || processing}
            >
                {children || buttonText}
            </button>

            <Modal
                show={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {confirmText}
                    </h2>

                    {itemName && (
                        <p className="mt-1 text-sm text-gray-600">
                            You are about to delete <strong>{itemName}</strong>.
                            This action cannot be undone.
                        </p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            onClick={() => setConfirmingDeletion(false)}
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="ml-3"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : `Delete ${itemType}`}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteButton;
