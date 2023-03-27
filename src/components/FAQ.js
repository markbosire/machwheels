import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./FAQ.css";

const FAQContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
`;

const FAQQuestion = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: #ffecf9;
  padding: 10px 5px;
  width: 100%;
  border-radius: 7px;
`;

const FAQAnswer = styled.div`
  font-size: ${(props) => (props.open ? "1rem" : "0")};
  color: ${(props) => (props.open ? "#000" : "rgba(0, 0, 0, 0);")};
  padding: 10px;
  transition: all 0.3s;
  max-width: ${(props) => (props.open ? "auto" : "0")};
  max-height: ${(props) => (props.open ? "auto" : "0")};
  overflow: hidden;
`;

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      {faqs.map((faq, index) => (
        <FAQItem key={index}>
          <FAQQuestion onClick={() => toggleOpen(index)}>
            {faq.question}
            <ArrowDropDownIcon sx={{ fontSize: "20px" }} />
          </FAQQuestion>
          <FAQAnswer open={openIndex === index}>{faq.answer}</FAQAnswer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
