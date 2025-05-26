'use client';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const collections = ['contact-us-form', 'subscriber_emails', 'user_details'];

const Wrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Dropdown = styled.select`
  padding: 8px;
  font-size: 16px;
  min-width: 200px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
    vertical-align: top;
  }

  input {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 14px;
    padding: 4px;
  }

  input:focus {
    outline: 1px solid #4b4b39;
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  background-color: #4b4b39;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  padding: 4px;

  &:focus {
    outline: 1px solid #4b4b39;
    background-color: #f9f9f9;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  resize: vertical;
  border: none;
  background: transparent;
  font-size: 14px;
  padding: 4px;
  line-height: 1.4;
  overflow-y: auto;

  &:focus {
    outline: 1px solid #4b4b39;
    background-color: #f9f9f9;
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const [selectedCollection, setSelectedCollection] =
    useState('contact-us-form');
  const [data, setData] = useState<any[]>([]);
  const [editedData, setEditedData] = useState<any>({});

  useEffect(() => {
    if (!authenticated) return;

    fetch('/api/admin/getCollections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection: selectedCollection }),
    })
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, [selectedCollection, authenticated]);

  const handleInputChange = (id: string, field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const updates = Object.entries(editedData);
    for (const [id, fields] of updates) {
      await fetch('/api/admin/updatedCollections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: selectedCollection,
          id,
          updates: fields,
        }),
      });
    }

    alert('Changes saved!');
    setEditedData({});
  };

  const headers = Array.from(
    new Set(data.flatMap((d) => Object.keys(d)).filter((k) => k !== 'id')),
  );

  if (!authenticated) {
    return (
      <Wrapper>
        <div
          style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}
        >
          <h2>Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '100%',
              marginBottom: '10px',
            }}
          />
          <Button
            onClick={async () => {
              const response = await fetch('/api/admin/checkPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  password, // Pass it securely
                }),
              });
              const responsedata = await response.json();
              if (!!responsedata.authorised) {
                setAuthenticated(true);
              } else {
                alert('Incorrect password');
              }
            }}
          >
            Submit
          </Button>
        </div>
      </Wrapper>
    );
  }

  // Authenticated dashboard UI
  return (
    <Wrapper>
      <Controls>
        <Dropdown
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          {collections.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </Dropdown>

        <Button onClick={handleSave}>Save Changes</Button>
      </Controls>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {headers.map((h) => (
                  <td key={h}>
                    {(() => {
                      const rawValue =
                        editedData[row.id]?.[h] ??
                        (row[h] !== undefined ? row[h] : '');
                      const isMultiline =
                        typeof rawValue === 'string' && rawValue.includes('\n');

                      return isMultiline ? (
                        <Textarea
                          value={rawValue}
                          onChange={(e) =>
                            handleInputChange(row.id, h, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          value={rawValue}
                          onChange={(e) =>
                            handleInputChange(row.id, h, e.target.value)
                          }
                        />
                      );
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

export default Dashboard;
