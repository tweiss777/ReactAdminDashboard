import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import '../scss/NotFound.scss'
export default function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h1>Page not found</h1>
      <Button type={'primary'}onClick={goBack}>Go Back </Button>
    </div>
  );
}
