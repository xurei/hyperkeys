#include <iostream>
#include <windows.h>

int main() {
    HWND foregroundWin = GetForegroundWindow();

    std::cout << foregroundWin << std::endl;
    return 0;
}