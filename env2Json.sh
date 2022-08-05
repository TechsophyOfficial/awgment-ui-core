echo "{"
IFS='='
count=0
env  | grep REACT_APP | while  read -r name value ; 
do 
  if [ $count -gt 0 ]; 
    then  echo ","   
  fi  
  
  echo \"$name\" : \"$value\"; 
  count=1
done
    

echo "}" 