// components/ModalDialog.tsx

import React, { useEffect, useRef } from "react";

type ModalDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	message: string;
};

const ModalDialog: React.FC<ModalDialogProps> = ({
	isOpen,
	onClose,
	message,
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (isOpen && dialog) {
			dialog.showModal();
		} else if (!isOpen && dialog) {
			dialog.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} onClick={onClose}>
			<p>{message}</p>
			<button onClick={onClose}>Close</button>
		</dialog>
	);
};

export default ModalDialog;
