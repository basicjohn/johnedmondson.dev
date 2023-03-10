// Components
import MuiModal from "@mui/material/Modal";
import { Box } from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Styles
import styles from "./ComingSoon.module.scss";

const rootClass = "modal";

export interface ModalProps {
  toggle: () => void;
  open: boolean;
  title?: string;
  content: string | React.ReactNode;
}
function Modal(props: ModalProps) {
  const { open, toggle } = props;

  return (
    <div className={styles[rootClass]}>
      <MuiModal open={open} onClose={toggle}>
        <Box className={styles[`${rootClass}__modal-box`]}>
          <Box className={styles[`${rootClass}__modal-header`]}>
            <button onClick={toggle}>
              <CloseIcon />
            </button>
          </Box>
          <Box className={styles[`${rootClass}__modal-content`]}>
            {props.title && <h3>props.title</h3>}
            <div className={styles[`${rootClass}__content`]}>
              {props.content}
            </div>
          </Box>
        </Box>
      </MuiModal>
    </div>
  );
}

export default Modal;
