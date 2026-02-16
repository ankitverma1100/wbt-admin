import { Button } from "antd";

const ModalFooter = ({ onCancel }) => (
  <>
    <Button
      type="default"
      style={{
        backgroundColor: "transparent",
        border: "1px solid #b9b9b9",
        color: "#000",
        borderRadius: 8,
      }}
      onClick={onCancel}>
      Cancel
    </Button>
    <Button
      type="primary"
      style={{ borderRadius: 8 }}
      onClick={onCancel}>
      OK
    </Button>
  </>
);

export default ModalFooter;
