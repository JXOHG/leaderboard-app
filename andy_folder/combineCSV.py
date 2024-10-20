import pandas as pd

def combine_and_replace_csv():
    ### In case the csv files used, uses commas as delimiters, remove section 1-3 below and uncomment this block of code
    ## Read relevant columns from both CSV files
    #submit_df = pd.read_csv("submit.csv", usecols=["Name", "Total Steps", "Avg Daily Steps"])
    #manual_df = pd.read_csv("manual.csv", usecols=["Name", "Total Steps", "Avg Daily Steps"])


    # (1) Load CSVs, handle tab separators, and clean column names
    submit_df = pd.read_csv("submit.csv", sep='\t') #Change '\t' to another delimiter depending on delimiter used in file
    manual_df = pd.read_csv("manual.csv", sep='\t')

    # (2) Clean column names to avoid issues with extra spaces or mismatches
    submit_df.columns = submit_df.columns.str.strip()
    manual_df.columns = manual_df.columns.str.strip()

    # (3) Select the relevant columns
    submit_df = submit_df[["Name", "Total Steps", "Avg Daily Steps"]]
    manual_df = manual_df[["Name", "Total Steps", "Avg Daily Steps"]]

    # Combine the two DataFrames
    combined_df = pd.concat([submit_df, manual_df], ignore_index=True)

    # Replace the existing 'main.csv' with the combined data
    combined_df.to_csv("main.csv", index=False)

    print("Files combined successfully, and 'main.csv' has been replaced.")
    
    
def main():
    combine_and_replace_csv()

main()