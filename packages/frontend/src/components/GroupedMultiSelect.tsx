/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import FakeSelect from './FakeSelect';
import { selectStyles } from './MutliSelect';
import styles from '../app/configure/Configure.module.css';

interface GroupedMultiSelectProps {
  options: { value: string; label: string }[];
  values: string[][] | null;
  setValues: (values: string[][]) => void;
}

const GroupedMultiSelect: React.FC<GroupedMultiSelectProps> = ({
  options,
  setValues,
  values,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [groups, setGroups] = useState<string[][]>(values || [[]]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add a new empty group
  const addGroup = () => {
    setGroups([...groups, []]);
    setValues([...groups, []]);
  };

  // Remove a group
  const removeGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
    setValues(newGroups);
  };

  // Update a specific group
  const updateGroup = (index: number, newGroupValues: string[]) => {
    const newGroups = [...groups];
    newGroups[index] = newGroupValues;
    setGroups(newGroups);
    setValues(newGroups);
  };

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index} className={styles.languageGroup}>
          <div className={styles.groupHeader}>
            <span>Group {index + 1} (same priority level)</span>
            <button
              onClick={() => removeGroup(index)}
              className={styles.removeGroupButton}
              type="button"
            >
              Remove group
            </button>
          </div>
          {isClient ? (
            <Select
              isMulti
              value={group
                .map((value) =>
                  options.find((option) => option.value === value)
                )
                .filter(Boolean)}
              closeMenuOnSelect={false}
              options={options}
              onChange={(selectedOptions: any) => {
                const selectedLanguages = selectedOptions.map(
                  (option: any) => option.value
                );
                updateGroup(index, selectedLanguages);
              }}
              styles={selectStyles}
            />
          ) : (
            <FakeSelect innerText="Select..." />
          )}
        </div>
      ))}
      <button
        onClick={addGroup}
        className={styles.addGroupButton}
        type="button"
      >
        Add language group
      </button>
    </div>
  );
};

export default GroupedMultiSelect;
