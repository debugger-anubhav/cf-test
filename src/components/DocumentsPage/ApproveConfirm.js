import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useEffect} from "react";
import styles from "./style.module.css";
// import {Close} from "@/assets/icon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

export default function ApproveConfirm({
  ApproveOpen,
  setApproveOpen,
  statusUpdateApiCall,
  item,
}) {
  const [open, setOpen] = React.useState(ApproveOpen);

  useEffect(() => {
    setOpen(ApproveOpen);
  }, [ApproveOpen]);

  const onClose = () => {
    setApproveOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal_custom}>
        <Box sx={style}>
          {/* <Close
            color={"#45454A"}
            size={24}
            className="cursor-pointer absolute top-8 right-4 ml-4"
            onClick={() => setApproveOpen(false)}
          /> */}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className="text-71717A font-Poppins md:text-18 text-16 font-medium">
              Are you sure you want to approve this document?
            </p>
          </Typography>
          <div className="flex w-full gap-4">
            <button
              className={styles.Approved_Btn}
              onClick={() => setApproveOpen(false)}>
              Review Again
            </button>
            <button
              className={styles.plain_btn}
              onClick={() => {
                statusUpdateApiCall(item, 1);
                setApproveOpen(false);
              }}>
              Yes, Approve
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
