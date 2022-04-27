import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const id = useParams().id;

  const navigate = useNavigate();
  const [member, setMember] = useState({
    name: "",
    userEmail: "",
    birthYear: 0,
    gender: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/member/find/${id}`).then((res) => {
      setMember(res.data);
    });
  }, []);

  const deleteMember = () => {
    axios
      .delete(`http://localhost:8080/api/member/delete/${id}`)
      .then((res) => navigate("/"))
      .catch((error) => console.log(error));
  };
  const updateMember = () => {
    navigate(`/updateForm/${id}`);
  };
  

  return (
    <div style={{textAlign: "center"}}>
      <hr />
      <h1> = 프로필 수정 = </h1>
      <hr />
      <Link to="/" className="navbar-brand">
      <Button variant="outline-info" onClick={updateMember}>
        수정완료
      </Button>
      </Link>{" "}
      <Button variant="outline-danger" onClick={deleteMember}>
        삭제
      </Button>
      <hr />
      <h3>{member.name}</h3>
      <hr />
      <h3>{member.userEmail}</h3>
      <hr />
      <h3>{member.birthYear}</h3>
      <hr />
      <h3>{member.gender}</h3>
      <hr />
      <Button variant="outline-success">Success</Button>{' '}
    </div>
  );
};

export default Detail;


