
import React from 'react';
import { AppMovingChecklist } from '../types';

interface MovingChecklistDisplayProps {
  checklist: AppMovingChecklist;
  onToggleTaskCompleted: (weekName: string, taskId: string) => void;
}

const MovingChecklistDisplay: React.FC<MovingChecklistDisplayProps> = ({ checklist, onToggleTaskCompleted }) => {
  if (!checklist || checklist.length === 0) {
    return <p className="text-center text-slate-400 text-lg">No moving checklist items to display.</p>;
  }

  return (
    <div className="space-y-8">
      {checklist.map((week) => (
        <div key={week.week} className="bg-slate-800 shadow-xl rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2">
            {week.week}
          </h3>
          {week.tasks.length > 0 ? (
            <ul className="space-y-3">
              {week.tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-start p-3 rounded-md transition-all duration-200 ease-in-out ${
                    task.completed ? 'bg-fuchsia-800/30 text-slate-500' : 'bg-slate-700/70 hover:bg-slate-600/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => onToggleTaskCompleted(week.week, task.id)}
                    className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 mt-1 flex-shrink-0 accent-fuchsia-500 cursor-pointer"
                    aria-labelledby={`task-label-${task.id}`}
                  />
                  <label htmlFor={`task-${task.id}`} className="flex-grow cursor-pointer">
                    <span 
                      id={`task-label-${task.id}`}
                      className={`font-medium ${task.completed ? 'line-through' : 'text-slate-100'}`}
                    >
                      {task.taskName}
                    </span>
                    {task.notes && (
                      <p className={`text-xs mt-1 ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                        <strong>Notes:</strong> {task.notes}
                      </p>
                    )}
                    {task.deadline && (
                      <p className={`text-xs mt-1 ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                        <strong>Deadline:</strong> {task.deadline}
                      </p>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No tasks for this period.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovingChecklistDisplay;
