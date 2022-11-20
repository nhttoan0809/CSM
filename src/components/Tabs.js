import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const navigate = useNavigate();
  const tabsList = props.tabsList;
  const [value, setValue] = React.useState(0);

  const location = useLocation();

  React.useEffect(() => {
    tabsList.forEach((tab, ind) => {
      if (location.pathname.includes(tab.url)) {
        setValue(ind);
      }
    });
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabsList.map((tab, index) => (
            <Tab
              onClick={() => {
                navigate(tab.url);
              }}
              key={index}
              label={tab.title}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabsList.map((element, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Outlet />
        </TabPanel>
      ))}
    </Box>
  );
}
