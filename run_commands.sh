#!/bin/bash

# Kill any existing tmux session named "mysession"
tmux kill-session -t mysession 2>/dev/null

# Start a new tmux session and run the first command
tmux new-session -d -s mysession 'python ./python-backend/app.py'

# Split the tmux window and run the second command
tmux split-window -h -t mysession 'npm run dev'

# Attach to the tmux session
tmux attach-session -t mysession
