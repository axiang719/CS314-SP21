# Inspection Checklist for t13

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?
* Are important variables accessible by every method that needs them?
* Is private data kept private (ex. public methods expose private data)?
* Are all streams that we're done using closed?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?
* Are all methods caller-independent?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?
* Are method parameters checked before they're used?
* Are parameters the approrpiate type for their function?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?
* Is every Java function/class/etc. that we imported actually being used?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?
* Are we minimizing the scope of data?

### Exception faults
* Have all possible error conditions been considered?
* Does the program respond appropriately to errors when they happen?

### Maintainability Faults
* Are all functions >25 lines of code?
* Are functions serving only one purpose?
* Could a complex method be broken up into multiple methods?
* Is the same code written twice elsewhere in the program?
* Are method names descriptive and make their function obvious?
* Does every method have test coverage?
* Are variables declared in the order that they are used?
