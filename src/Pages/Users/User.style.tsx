import styled from "styled-components";
import { STYLE_GUIDE } from "../../assets/Style/global";
import CheckedIcon from "../../assets/check-icon.svg";

export const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    margin-left: 223px;
  }
`;

export const UsersWrapper = styled.div`
  margin-block: 40px;
  margin-left: 0px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const UserLabel = styled.p`
  width: 108px;
  height: 14px;
  font-family: "Roboto";
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #c4c4c4;
`;
export const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MetricsDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const UserLength = styled.h1`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 64px;
  line-height: 75px;
  text-align: center;
  color: #343434;
`;



export const LineProfile = styled.td`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  p {
    font-family: "Roboto";
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.01em;
    color: #323c47;
  }
`;



export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ebeff2;
  align-self: stretch;
  flex-grow: 1;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ModalUserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const ModelUserName = styled.h3``;


export const Container = styled.div`
  margin-top: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  @media (min-width: 1024px) {
    margin-left: 223px;
  }
`;

export const TableContainer = styled.div`
  width: 80%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Head = styled.thead`
  background: #f9f9fb;
  color: white;
  width: 100%;
`;

export const ColumnName = styled.th`
  padding: 14px;
  font-size: 16px;
  text-align: left;
  color: ${STYLE_GUIDE.color.dark};
  text-transform: uppercase;
`;

export const Body = styled.tbody``;

export const Line = styled.tr`
  position: relative;
  &:hover {
    background: #f9f9fb;
  }
`;

export const CheckBoxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;

  &:checked + div {
    background-color: ${STYLE_GUIDE.color.secondary};
    border-color: ${STYLE_GUIDE.color.secondary};
  }

  &:checked + div::after {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${CheckedIcon});
    background-repeat: none;
    background-size: 100%;
    background-position: center;
    display: block;
    color: white;
    font-size: 14px;
    text-align: center;
  }
`;

export const CheckBoxCustom = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${STYLE_GUIDE.color.secondary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.2s;
`;

export const Value = styled.td`
  padding: 12px;
  font-size: 14px;
  color: ${STYLE_GUIDE.color.dark};
`;

export const Actions = styled.td`
  text-align: center;
  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 5px;

    &:hover {
      color: ${STYLE_GUIDE.color.secondary};
    }
  }
`;

export const ModalOptions = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 120px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

export const TextBackground = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const ButtonText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 44px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SearchInput = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding-left: 22px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 90%;
`;
export const Icon = styled.i`
  color: #c4c4c4;
`;

export const Button = styled.button`
  width: 182px;
  height: 40px;
  border-radius: 30px;
  background-color: ${STYLE_GUIDE.color.secondary};
  color: ${STYLE_GUIDE.color.white};
  border: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #6a5490;
  }
`;

export const Column = styled.tr`
  height: 48px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 22px;
`;

export const WrapperForm = styled.div`
  flex-direction: column;
  display: flex;
  gap: 6px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const InputModal = styled.input`
  outline: none;
  background: transparent;
  height: 40px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  padding-left: 20px;
`;
export const Label = styled.label`
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
  letter-spacing: 0.1px;
  color: #323c47;
`;

export const ButtonCancel = styled.button`
  border: none;
  cursor: pointer;
  height: 38px;
  border-radius: 6px;
  padding-inline: 15px;
  color: ${STYLE_GUIDE.color.white};
  background: #7d7d7d;

  transition: 0.3s;

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.2px;

  &:hover {
    background: #636363;
  }
`;

export const ButtonConfirm = styled.button`
  border: none;
  height: 38px;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${STYLE_GUIDE.color.secondary};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.2px;
  color: #ffffff;
  width: 80px;
  transition: 0.3s;

  &:hover {
    background: #6a5490;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  margin-top: 20px;
`;

export const ModalText = styled.p``;

export const TableCategory = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const LineCategory = styled.tr`
  position: relative;
  &:hover {
    background: #f9f9fb;
    cursor: pointer;
  }
`;

export const WrapperCategoryInfo = styled.div`
  display: flex;
  padding-inline-start: 18px;
  gap: 20px;
  align-items: center;
`;

export const IconTrash = styled.i`
  color: ${STYLE_GUIDE.color.alert};
  &:hover{
    cursor: pointer; 
  }
`;
export const IconDarked = styled.i`
  color: ${STYLE_GUIDE.color.dark};
  font-size: 20px;
  &:hover{
    cursor: pointer; 
  }
`;

export const Select = styled.select`
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding-left: 22px;
  @media (max-width: 768px) {
    width: 100%;
  }
`