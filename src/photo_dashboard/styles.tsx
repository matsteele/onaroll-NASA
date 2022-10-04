import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Dashboard = styled.div`
  .date-header {
    z-index: 10;
    position: absolute;
    display: flex;
    width: 50%;
    /* text-align: center; */
    .react-datepicker-popper {
    }
    .react-datepicker {
      background-color: #f0f0f038;
      margin-left: 30px;
      .react-datepicker__header {
        background-color: #ffffff1f;
        color: #f0f0f0;
      }
      .react-datepicker__triangle {
        display: none;
      }
      .react-datepicker__day {
        color: white;

        /* &[aria-label="false"] {
          background-color: green;
        } */
        :hover {
          background-color: #266ca375;
        }
      }
    }
    .react-datepicker-wrapper {
      .react-datepicker__input-container {
        margin: 30px;
      }
      input {
        text-align: center;
        background: #d9d9d929;
        border: 1px solid #d9d9d929;
        border-style: solid;
        color: white;
        font-weight: bold;
        border-radius: 12px;
      }
    }
  }
  main {
    img {
      width: 100%;
      position: absolute;
    }
    .center {
      display: flex;
      width: 100%;
      height: 100vw;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const InfoBoxContainer = styled.div<{ isopen: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  width: 50vw;
  color: white;
  right: 5%;
  top: 15px;
  header {
    font-weight: bold;
  }
  .infotext {
    opacity: ${(props) => (props.isopen === "true" ? 1 : 0)};
    transition: opacity 0.2s;
    height: 130%;
    background: #38383875;
    padding: 20px;
    border-radius: 20px;
    border-top-right-radius: 0;
  }
`;

export const InfoButton = styled(Button)<{ isopen: string }>`
  && {
    background: ${(props) =>
      props.isopen === "true" ? "#e10f0f94" : "#b3b3b3"};
    color: white;
    width: 50px;
    :hover {
      background: #e10f0f94;
    }
  }
`;
