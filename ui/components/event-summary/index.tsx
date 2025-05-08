import React from 'react';
import { EventSummaryProps, GroupedCompanies } from './types';

export const EventSummary: React.FC<EventSummaryProps> = ({
  checkedInCount,
  notCheckedInCount,
  companyBreakdown,
}) => {
  const groupedCompanies: GroupedCompanies = (companyBreakdown && Array.isArray(companyBreakdown))
    ? companyBreakdown.reduce((acc: any, curr: any) => {
        const name = curr.companyName || 'No associated company';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {})
    : {};


  return (
    <div className="mt-4 p-4 border rounded flex flex-col items-center justify-center">
      <div>
        <h2 className="font-bold text-lg mb-4 text-center p-[5px]">Event Summary</h2>
        <div>
          <div className="flex flex-row">
            <div className="font-bold">🟢 Checked-in: </div>
            <p>{checkedInCount >= 0 ? checkedInCount : 'N/A'}</p>
          </div>
          <div className="flex flex-row">
            <div className="font-bold">🔴 Not checked-in yet: </div>
            <p>{notCheckedInCount >= 0 ? notCheckedInCount : 'N/A'}</p>
          </div>
        </div>

        {checkedInCount > 0 && groupedCompanies && (
          <div className="p-1 justify-center items-center">
            <p className="font-bold">🏢 Checked-in by company:</p>
            <ul>
              {Object.entries(groupedCompanies).map(([companyName, count]) => (
                <li key={companyName}>
                  ⭐ {companyName}: {count}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
