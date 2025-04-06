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

  // Update groups when values prop changes
  useEffect(() => {
    if (values) {
      setGroups(values);
    }
  }, [values]);

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

  // Move a group up
  const moveGroupUp = (index: number) => {
    if (index > 0) {
      const newGroups = [...groups];
      const temp = newGroups[index];
      newGroups[index] = newGroups[index - 1];
      newGroups[index - 1] = temp;
      setGroups(newGroups);
      setValues(newGroups);
    }
  };

  // Move a group down
  const moveGroupDown = (index: number) => {
    if (index < groups.length - 1) {
      const newGroups = [...groups];
      const temp = newGroups[index];
      newGroups[index] = newGroups[index + 1];
      newGroups[index + 1] = temp;
      setGroups(newGroups);
      setValues(newGroups);
    }
  };

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index} className={styles.languageGroup}>
          <div className={styles.groupHeader}>
            <span>Group {index + 1} (same priority level)</span>
            <div className={styles.groupActions}>
              <button
                onClick={() => moveGroupUp(index)}
                className={styles.moveButton}
                type="button"
                disabled={index === 0}
                title="Move group up (increase priority)"
              >
                ↑
              </button>
              <button
                onClick={() => moveGroupDown(index)}
                className={styles.moveButton}
                type="button"
                disabled={index === groups.length - 1}
                title="Move group down (decrease priority)"
              >
                ↓
              </button>
              <button
                onClick={() => removeGroup(index)}
                className={styles.removeGroupButton}
                type="button"
              >
                Remove group
              </button>
            </div>
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
