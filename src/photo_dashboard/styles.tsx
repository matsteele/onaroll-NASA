import styled from "styled-components";

export const Dashboard = styled.div`
  .date-header {
    position: absolute;
    display: flex;
    width: 100%;
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
    }
  }
`;
