#!/bin/bash
find -name "Folie*" -exec mogrify -chop 0x20+0+0 -gravity South -trim {} \;
