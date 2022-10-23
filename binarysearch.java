
public class BinaryDescending {
public static void main(String args[]) {
	int arr[]= {19,18,17,16,15,14};
	int target=15;
	int ans=binarySearchDescending(arr,target);
	System.out.println(ans);
			
	
}
static int binarySearchDescending(int arr[],int target) {
	int start=0;
	int end =arr.length-1;
	while(start<=end) {
		int mid=start+(end-start)/2;
		if(target<arr[mid]) {
			start=mid+1;
			
		}
		else if(target>arr[mid]) {
			end=mid-1;
			
		}
		else {
			return mid;
			
		}
	}
	return -1;
}
}
