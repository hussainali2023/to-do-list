import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = `${date.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      key: "1",
      title: "Timestamp Created",
      dataIndex: "timeStamp",
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditRecord(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteRecord(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddRecord = () => {
    const randomNumber = parseInt(Math.random() * 2000);
    const randomMonth = parseInt(Math.random() * 12);
    const randomDays = parseInt(Math.random() * 30);
    const newStudent = {
      timeStamp: formattedDate,
      title: "Edit Tytle " + randomNumber,
      description: randomNumber + "Edit this description",
      address: "Edit Address " + randomNumber,
      dueDate: randomDays + "-" + randomMonth + "-" + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteRecord = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.title !== record.title);
        });
      },
    });
  };
  const onEditRecord = (record) => {
    setIsEditing(true);
    setEditingRecord({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRecord(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddRecord}>Add a new </Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Entry"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.timeStamp === editingRecord.timeStamp) {
                  return editingRecord;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <label htmlFor="">Title:</label>
          <Input
            value={editingRecord?.title}
            onChange={(e) => {
              setEditingRecord((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <label htmlFor="">Description:</label>
          <Input
            className="description"
            value={editingRecord?.description}
            onChange={(e) => {
              setEditingRecord((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />

          <label htmlFor="">Address:</label>
          <Input
            value={editingRecord?.address}
            onChange={(e) => {
              setEditingRecord((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
          <label htmlFor="">Due Date</label>
          <Input
            value={editingRecord?.dueDate}
            onChange={(e) => {
              setEditingRecord((pre) => {
                return { ...pre, dueDate: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
