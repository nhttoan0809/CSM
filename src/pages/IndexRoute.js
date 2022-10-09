import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Index = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/warehouse');
  }, [])

  return;
};

export default Index;
