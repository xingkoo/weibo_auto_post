(function() {
    // 配置项
    const config = {
        interval: 10 * 60 * 1000, // 10分钟间隔
        buttonWaitTime: 10 * 1000, // 等待按钮可点击的时间
        contentApi: 'http://localhost:8080/', // 获取内容的API
        selectors: {
            // 输入框选择器，可以是多个类名
            input: '.wbpro-form textarea',
            // 发送按钮选择器
            button: '.woo-button-main.woo-button-flat.woo-button-primary.woo-button-m.woo-button-round'
        }
    };

    // 获取文章内容
    async function getContent() {
        try {
            const response = await fetch(config.contentApi);
            const data = await response.json();
            
            if (!data.text) {
                throw new Error('获取内容失败');
            }
            
            return data.text;
        } catch (error) {
            console.error('获取文章失败:', error);
            return null;
        }
    }

    // 自动发送函数
    async function autoPost() {
        try {
            // 获取内容
            const content = await getContent();
            if (!content) {
                console.log('本次发送已跳过（获取内容失败）');
                return;
            }

            // 查找输入框
            const input = document.querySelector(config.selectors.input);
            if (!input) {
                console.error('未找到输入框，当前选择器:', config.selectors.input);
                return;
            }

            // 设置输入框的值
            const currentTime = new Date().toLocaleString('zh-CN');
            const fullContent = `${content} [${currentTime}]`;
            
            // 模拟输入
            input.value = fullContent;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            console.log('内容已填写，等待按钮可点击...');
            
            // 等待按钮可点击
            await new Promise(resolve => setTimeout(resolve, config.buttonWaitTime));
            
            // 查找并点击发送按钮
            const button = document.querySelector(config.selectors.button);
            if (!button) {
                console.error('未找到发送按钮，当前选择器:', config.selectors.button);
                return;
            }
            
            // 检查按钮是否可点击
            if (button.disabled) {
                console.error('按钮仍处于禁用状态');
                return;
            }
            
            // 触发点击
            button.click();
            console.log('发送成功:', new Date().toLocaleString('zh-CN'));
            
        } catch (error) {
            console.error('发送失败:', error);
        }
    }

    // 提供更新选择器的函数
    window.updateSelectors = function(inputSelector, buttonSelector) {
        if (inputSelector) {
            config.selectors.input = inputSelector;
            console.log('已更新输入框选择器为:', inputSelector);
        }
        if (buttonSelector) {
            config.selectors.button = buttonSelector;
            console.log('已更新发送按钮选择器为:', buttonSelector);
        }
    };

    // 启动自动发送
    console.log('自动发送脚本已启动...');
    console.log('当前选择器配置:', config.selectors);
    autoPost(); // 立即执行一次
    const intervalId = setInterval(autoPost, config.interval);
    
    // 提供停止函数
    window.stopAutoPost = function() {
        clearInterval(intervalId);
        console.log('自动发送已停止');
    };
    
    console.log('要停止自动发送，请在控制台执行: stopAutoPost()');
    console.log('要更新选择器，请执行: updateSelectors("新输入框选择器", "新按钮选择器")');
})();
