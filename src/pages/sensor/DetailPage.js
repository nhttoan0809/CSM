import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTable from "../../components/Table";
import sensor, { setSensorList } from "../../redux/sensor";

const headCells = [
  {
    id: 'sensor_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'data',
    numeric: false,
    disablePadding: false,
    label: 'Nhiệt độ',
  },
  {
    id: 'is_activated',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Vị trí',
  },
];

const SensorDetailPage = () => {

  const rows = useSelector(state => state.sensor.sensorList)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllSensor")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data: ", data)
        const payloadCustomize = data.data.map((sensor) => (
          {
            "sensor_id": sensor.sensor_id,
            "data": sensor.data,
            "is_activated": sensor.is_activated,
            "position": sensor.position,
        }
        ))
        dispatch(setSensorList(payloadCustomize))
      });
  }, []);

  return (
    <>
      {/* Title */}
      {/* <Typography>Chi tiết của cảm biến</Typography> */}
      <EnhancedTable title={{id: 'Sensor', name: 'Cam bien'}} headCells={headCells} rows={rows} />
    </>
  );
};

export default SensorDetailPage;
