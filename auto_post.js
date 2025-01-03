(function() {
    // 配置项
    const config = {
        content: '这里是要填写的内容',
        interval: 30 * 1000, // 测试用30秒，正式改为 10 * 60 * 1000 (10分钟)
        buttonWaitTime: 10 * 1000 // 等待按钮可点击的时间(10秒)
    };

    // 自动发送函数
    async function autoPost() {
        try {
            // 查找输入框
            const input = document.querySelector('.Form_input_2gtXx');
            if (!input) {
                console.error('未找到输入框');
                return;
            }

            // 设置输入框的值
            const currentTime = new Date().toLocaleString('zh-CN');
            const fullContent = `${config.content} [自动发送+${currentTime}]`;
            
            // 模拟输入
            input.value = fullContent;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            console.log('内容已填写，等待按钮可点击...');
            
            // 等待按钮可点击
            await new Promise(resolve => setTimeout(resolve, config.buttonWaitTime));
            
            // 查找并点击发送按钮
            const button = document.querySelector('.woo-button-main.woo-button-flat.woo-button-primary.woo-button-m.woo-button-round.Tool_btn_2Eane');
            if (!button) {
                console.error('未找到发送按钮');
                return;
            }
            
            // 检查按钮是否可点击
            if (button.disabled) {
                console.error('按钮仍处于禁用状态');
                return;
            }
            
            // 触发点击
            button.click();
            console.log('发送成功:', fullContent);
            
        } catch (error) {
            console.error('发送失败:', error);
        }
    }

    // 启动自动发送
    console.log('自动发送脚本已启动...');
    autoPost(); // 立即执行一次
    const intervalId = setInterval(autoPost, config.interval);
    
    // 提供停止函数
    window.stopAutoPost = function() {
        clearInterval(intervalId);
        console.log('自动发送已停止');
    };
    
    console.log('要停止自动发送，请在控制台执行: stopAutoPost()');
})();
