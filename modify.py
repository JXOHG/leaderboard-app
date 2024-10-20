import pandas as pd
import sys

csv = sys.argv[1]
manualName = sys.argv[2].split(',')
manualSteps = sys.argv[3].split(',')
#convert to int
manualSteps = list(map(int, manualSteps))
add = sys.argv[4]


try:
    df = pd.read_csv(csv)

#should never happen as a good file should always be provided
except (FileNotFoundError):
    print("File not found")
        
#take only the name and total steps
df = df[["Name", "Total Steps"]]

#if adding data, create a new data frame to concat with main 
if add:
    if manualName[0] != -1:
        data = {
            'Name': manualName,
            'Total Steps': manualSteps
        }
        
        df2 = pd.DataFrame(data)
        df = pd.concat([df, df2])
        
#sort
df = df.sort_values(by="Total Steps", axis=0, ascending=False)

#overwite main.csv with new updated csv
df.to_csv("main.csv", index=False)